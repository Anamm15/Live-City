import { CreateFacilityRequest, GetFacilityResponse, UpdateFacilityRequest } from "../dto/facility.dto";
import { IFacilityRepository } from "../interfaces/repositories/IFacilityRepository";
import { IFacilityService } from "../interfaces/services/IFacilityService";

export class FacilityService implements IFacilityService {
   private facilityRepository: IFacilityRepository;

   constructor(facilityRepository: IFacilityRepository) {
      this.facilityRepository = facilityRepository;
   }

   async getFacilities(): Promise<GetFacilityResponse[]> {
      try {
         return this.facilityRepository.getFacilities();
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }

   async getFacilityById(id: number): Promise<GetFacilityResponse | null> {
      try {
         return this.facilityRepository.getFacilityById(id);
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async createFacility(data: CreateFacilityRequest): Promise<GetFacilityResponse> {
      try {
         return this.facilityRepository.createFacility(data);
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async updateFacility(id: number, data: UpdateFacilityRequest): Promise<GetFacilityResponse> {
      try {
         return this.facilityRepository.updateFacility(id, data);
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async deleteFacility(id: number): Promise<void> {
      try {
         return this.facilityRepository.deleteFacility(id);
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
}