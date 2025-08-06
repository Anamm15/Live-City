import cloudinary from "../config/cloudinary";
import fs from "fs";
import { UploadFile } from "../dto/file.dto";
import { 
   CreateVillageRequest, 
   VillageResponse, 
   UpdateVillageRequest } from "../dto/villages.dto";
import { FileableType, Prisma, PrismaClient } from "../generated/prisma";
import { VillageMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IVillageRepository } from "../interfaces/repositories/IVillageRepository";
import { IVillageService } from "../interfaces/services/IVillageService";
import { generateFilename } from "../utils/formatFilename";
import { CloudFolderName } from "../helpers/app.constants";

export class VillageService implements IVillageService {
   private villageRepository: IVillageRepository;
   private fileRepository: IFileRepository;
   private prisma: PrismaClient;

   constructor(
      villageRepository: IVillageRepository, 
      fileRepository: IFileRepository,
      prisma: PrismaClient) {
      this.villageRepository = villageRepository;
      this.fileRepository = fileRepository;
      this.prisma = prisma;
   }

   async getVillages(): Promise<VillageResponse[]> {
      try {
         const villages = await this.villageRepository.getVillages();
         if (villages.length === 0) throw new Error(VillageMessage.VILLAGE_NOT_FOUND);
         return villages;
      } catch (error) {
         throw error;
      }    
   }

   async createVillage(data: CreateVillageRequest, file: Express.Multer.File): Promise<VillageResponse> {
      let cloudinaryResult : any | null = null;
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
         try {
            const newVillage = await this.villageRepository.createVillage(data, tx);
            const newFilename = generateFilename(FileableType.VILLAGE, newVillage.id);
            cloudinaryResult = await cloudinary.uploader.upload(file.path, {
               folder: CloudFolderName.VILLAGE,
               public_id: newFilename
            });
            
            fs.unlinkSync(file.path);
            const fileData: UploadFile = {
               urlFile: cloudinaryResult.secure_url,
               fileableId: newVillage.id,
               fileableType: FileableType.VILLAGE
            };
            await this.fileRepository.uploadFile(fileData, tx);
            return newVillage;
         } catch (error) {
            if (cloudinaryResult?.public_id) {
               await cloudinary.uploader.destroy(cloudinaryResult.public_id);
            }
            throw error;
         }
      });
   }

   async updateVillage(id: number, data: UpdateVillageRequest): Promise<VillageResponse> {
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