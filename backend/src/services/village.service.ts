import { CreateVillageRequest, GetResponseVillage } from "../dto/villages.dto";
import { IVillageRepository } from "../interfaces/repositories/IVillageRepository";
import { IVillageService } from "../interfaces/services/IVillageService";

export class VillageService implements IVillageService {
   private villageRepository: IVillageRepository;

   constructor(villageRepository: IVillageRepository) {
      this.villageRepository = villageRepository;
   }

   async getVillages(): Promise<GetResponseVillage[]> {
      try {
         return this.villageRepository.getVillages();  
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }

   async createVillage(data: CreateVillageRequest): Promise<GetResponseVillage> {
      try {
         return this.villageRepository.createVillage(data);  
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async updateVillage(id: number, data: CreateVillageRequest): Promise<GetResponseVillage> {
      try {
         return this.villageRepository.updateVillage(id, data);  
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async deleteVillage(id: number): Promise<void> {
      try {
         return this.villageRepository.deleteVillage(id);  
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
}