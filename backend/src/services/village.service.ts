import { 
   CreateVillageRequest, 
   VillageResponse, 
   UpdateVillageRequest } from "../dto/villages.dto";
import { VillageMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IVillageRepository } from "../interfaces/repositories/IVillageRepository";
import { IVillageService } from "../interfaces/services/IVillageService";

export class VillageService implements IVillageService {
   private villageRepository: IVillageRepository;
   private fileRepository: IFileRepository;

   constructor(villageRepository: IVillageRepository, fileRepository: IFileRepository) {
      this.villageRepository = villageRepository;
      this.fileRepository = fileRepository;
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

   async createVillage(data: CreateVillageRequest): Promise<VillageResponse> {
      try {
         return this.villageRepository.createVillage(data);  
      } catch (error) {
         throw error;
      }
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