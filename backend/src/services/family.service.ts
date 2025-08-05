import { 
   CreateFamilyRequest, 
   FamilyResponse, 
   FamilyWithMembersResponse, 
   UpdateFamilyRequest } from "../dto/family.dto";
import { FamilyMessage } from "../helpers/message.constants";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";
import { IFamilyService } from "../interfaces/services/IFamilyService";
import { NotFoundError } from "../utils/errors";



export class FamilyService implements IFamilyService {
   private familyRepository: IFamilyRepository

   constructor(familyRepository: IFamilyRepository) {
      this.familyRepository = familyRepository
   }
   
   async getFamilies(): Promise<FamilyResponse[]> {
      try {
         return this.familyRepository.getFamilies();
      } catch (error) {
         throw error;
      }
   }

   async getFamilyWithMembers(id: number): Promise<FamilyWithMembersResponse> {
      try {
         const families = await this.familyRepository.getFamilyWithMembers(id);
         if (!families) {
            throw new NotFoundError(FamilyMessage.FAMILY_NOT_FOUND);
         }
         return families;
      } catch (error) {
         throw error;
      }    
   }

   async createFamily(family: CreateFamilyRequest): Promise<FamilyResponse> {
      try {
         return this.familyRepository.createFamily(family);
      } catch (error) {
         throw error;
      }     
   }

   async updateFamily(id: number, family: UpdateFamilyRequest): Promise<FamilyResponse> {
      try {
         return this.familyRepository.updateFamily(id, family);
      } catch (error) {
         throw error;
      }    
   }

   async deleteFamily(id: number): Promise<void> {
      try {
         await this.familyRepository.deleteFamily(id);
      } catch (error) {
         throw error;
      }    
   }
}