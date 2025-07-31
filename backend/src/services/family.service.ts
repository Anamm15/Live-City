import { CreateFamilyRequest, GetFamilyResponse, GetFamilyWithMembers, UpdateFamilyRequest } from "../dto/family.dto";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";
import { IFamilyService } from "../interfaces/services/IFamilyService";



export class FamilyService implements IFamilyService {
   private familyRepository: IFamilyRepository

   constructor(familyRepository: IFamilyRepository) {
      this.familyRepository = familyRepository
   }
   
   async getFamilies(): Promise<GetFamilyResponse[]> {
      try {
         return this.familyRepository.getFamilies();
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async getFamilyWithMembers(id: number): Promise<GetFamilyWithMembers | null> {
      try {
         return this.familyRepository.getFamilyWithMembers(id);
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }

   async createFamily(family: CreateFamilyRequest): Promise<GetFamilyResponse> {
      try {
         return this.familyRepository.createFamily(family);
      } catch (error: any) {
         throw new Error(error.message);
      }     
   }

   async updateFamily(id: number, family: UpdateFamilyRequest): Promise<GetFamilyResponse> {
      try {
         const data: UpdateFamilyRequest = { ...family, id };
         return this.familyRepository.updateFamily(data);
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }

   async deleteFamily(id: number): Promise<void> {
      try {
         await this.familyRepository.deleteFamily(id);
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }
}