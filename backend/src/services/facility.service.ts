import { 
   CreateFacilityRequest, 
   FacilityResponse, 
   UpdateFacilityRequest } from "../dto/facility.dto";
import { FacilityMessage } from "../helpers/message.constants";
import { IFacilityRepository } from "../interfaces/repositories/IFacilityRepository";
import { IFacilityService } from "../interfaces/services/IFacilityService";
import { NotFoundError } from "../utils/errors";

export class FacilityService implements IFacilityService {
   private facilityRepository: IFacilityRepository;

   constructor(facilityRepository: IFacilityRepository) {
      this.facilityRepository = facilityRepository;
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

   async createFacility(data: CreateFacilityRequest): Promise<FacilityResponse> {
      try {
         return this.facilityRepository.createFacility(data);
      } catch (error) {
         throw error;
      } 
   }

   async updateFacility(id: number, data: UpdateFacilityRequest): Promise<FacilityResponse> {
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