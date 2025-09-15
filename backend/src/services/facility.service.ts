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
import { CloudFolderName } from "../helpers/app.constants";

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
    let cloudinaryResult: any | null = null;
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        try {
          const newFacility = await this.facilityRepository.createFacility(
            data,
            tx
          );
          const newFilename = generateFilename(
            FileableType.FACILITY,
            newFacility.id
          );
          cloudinaryResult = await cloudinary.uploader.upload(file.path, {
            folder: CloudFolderName.FACILITY,
            public_id: newFilename,
          });

          fs.unlinkSync(file.path);
          const fileData: UploadFile = {
            urlFile: cloudinaryResult.secure_url,
            fileableId: newFacility.id,
            fileableType: FileableType.FACILITY,
          };
          await this.fileRepository.uploadFile(fileData, tx);
          return newFacility;
        } catch (error) {
          if (cloudinaryResult?.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          }
          throw error;
        }
      }
    );
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
