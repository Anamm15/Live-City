import cloudinary from "../config/cloudinary";
import fs from "fs";
import { UploadFile } from "../dto/file.dto";
import {
  CreateVillageRequest,
  VillageResponse,
  UpdateVillageRequest,
} from "../dto/villages.dto";
import { FileableType, Prisma, PrismaClient } from "@prisma/client";
import { VillageMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IVillageRepository } from "../interfaces/repositories/IVillageRepository";
import { IVillageService } from "../interfaces/services/IVillageService";
import { generateFilename } from "../utils/format";
import { CloudFolderName, PrefixType } from "../helpers/app.constants";
import {
  deleteFileFromFirebase,
  uploadFileToFirebase,
} from "../utils/firebaseStorage";
import { generateUUIDWithPrefix } from "../utils/uuid";
import path from "path";

export class VillageService implements IVillageService {
  private villageRepository: IVillageRepository;
  private fileRepository: IFileRepository;
  private prisma: PrismaClient;

  constructor(
    villageRepository: IVillageRepository,
    fileRepository: IFileRepository,
    prisma: PrismaClient
  ) {
    this.villageRepository = villageRepository;
    this.fileRepository = fileRepository;
    this.prisma = prisma;
  }

  async getVillages(): Promise<VillageResponse[]> {
    try {
      const villages = await this.villageRepository.getVillages();
      if (villages.length === 0)
        throw new Error(VillageMessage.VILLAGE_NOT_FOUND);
      return villages;
    } catch (error) {
      throw error;
    }
  }

  async createVillage(
    data: CreateVillageRequest,
    file: Express.Multer.File
  ): Promise<VillageResponse> {
    let uploadedFilename: string | null = null;

    try {
      const uuid = generateUUIDWithPrefix(PrefixType.VILLAGE);
      const fileExtension = path.extname(file.originalname);
      const baseFilename = generateFilename(FileableType.VILLAGE, uuid);
      const newFilename = `${baseFilename}${fileExtension}`;

      const signedUrl = await uploadFileToFirebase(
        file,
        CloudFolderName.VILLAGE,
        newFilename
      );
      uploadedFilename = newFilename;

      const result = await this.prisma.$transaction(async (tx) => {
        const newVillage = await this.villageRepository.createVillage(data, tx);

        await this.fileRepository.uploadFile(
          {
            urlFile: signedUrl,
            fileableId: newVillage.id,
            fileableType: FileableType.VILLAGE,
          },
          tx
        );

        return newVillage;
      });

      return result;
    } catch (error) {
      if (uploadedFilename) {
        await deleteFileFromFirebase(CloudFolderName.VILLAGE, uploadedFilename);
      }
      throw error;
    }
  }

  async updateVillage(
    id: number,
    data: UpdateVillageRequest
  ): Promise<VillageResponse> {
    try {
      return this.villageRepository.updateVillage(id, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteVillage(id: number): Promise<void> {
    try {
      return this.villageRepository.deleteVillage(id);
    } catch (error) {
      throw error;
    }
  }
}
