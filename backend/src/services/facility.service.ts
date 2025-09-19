import { Prisma } from "@prisma/client";
import fs from "fs";
import {
  CreateFacilityRequest,
  FacilityResponse,
  UpdateFacilityRequest,
} from "../dto/facility.dto";
import { FileableType, PrismaClient } from "@prisma/client";
import { FacilityMessage } from "../helpers/message.constants";
import { IFacilityRepository } from "../interfaces/repositories/IFacilityRepository";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IFacilityService } from "../interfaces/services/IFacilityService";
import { NotFoundError } from "../utils/errors";
import cloudinary from "../config/cloudinary";
import { UploadFile } from "../dto/file.dto";
import { generateFilename } from "../utils/format";
import { CloudFolderName, PrefixType } from "../helpers/app.constants";
import { generateUUIDWithPrefix } from "../utils/uuid";
import path from "path";
import {
  deleteFileFromFirebase,
  uploadFileToFirebase,
} from "../utils/firebaseStorage";

export class FacilityService implements IFacilityService {
  private facilityRepository: IFacilityRepository;
  private fileRepository: IFileRepository;
  private prisma: PrismaClient;

  constructor(
    facilityRepository: IFacilityRepository,
    fileRepository: IFileRepository,
    prisma: PrismaClient
  ) {
    this.facilityRepository = facilityRepository;
    this.fileRepository = fileRepository;
    this.prisma = prisma;
  }

  async getFacilities(): Promise<FacilityResponse[]> {
    try {
      const facilities = await this.facilityRepository.getFacilities();
      if (facilities.length === 0) {
        throw new NotFoundError(FacilityMessage.FACILITY_NOT_FOUND);
      }
      return facilities;
    } catch (error) {
      throw error;
    }
  }

  async getFacilityById(id: number): Promise<FacilityResponse> {
    try {
      const facility = await this.facilityRepository.getFacilityById(id);
      if (!facility) {
        throw new NotFoundError(FacilityMessage.FACILITY_NOT_FOUND);
      }
      return facility;
    } catch (error) {
      throw error;
    }
  }

  async createFacility(
    data: CreateFacilityRequest,
    file: Express.Multer.File
  ): Promise<FacilityResponse> {
    let uploadedFilename: string | null = null;

    try {
      const uuid = generateUUIDWithPrefix(PrefixType.FACILITY);
      const fileExtension = path.extname(file.originalname);
      const baseFilename = generateFilename(FileableType.FACILITY, uuid);
      const newFilename = `${baseFilename}${fileExtension}`;

      const signedUrl = await uploadFileToFirebase(
        file,
        CloudFolderName.FACILITY,
        newFilename
      );
      uploadedFilename = newFilename;

      const result = await this.prisma.$transaction(async (tx) => {
        const newFacility = await this.facilityRepository.createFacility(
          data,
          tx
        );

        await this.fileRepository.uploadFile(
          {
            urlFile: signedUrl,
            fileableId: newFacility.id,
            fileableType: FileableType.FACILITY,
          },
          tx
        );

        return newFacility;
      });

      return result;
    } catch (error) {
      if (uploadedFilename) {
        await deleteFileFromFirebase(
          CloudFolderName.FACILITY,
          uploadedFilename
        );
      }
      throw error;
    }
  }

  async updateFacility(
    id: number,
    data: UpdateFacilityRequest
  ): Promise<FacilityResponse> {
    try {
      return this.facilityRepository.updateFacility(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteFacility(id: number): Promise<void> {
    try {
      return this.facilityRepository.deleteFacility(id);
    } catch (error) {
      throw error;
    }
  }
}
