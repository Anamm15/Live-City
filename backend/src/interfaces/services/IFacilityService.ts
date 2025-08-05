import { 
   CreateFacilityRequest, 
   FacilityResponse, 
   UpdateFacilityRequest } from "../../dto/facility.dto";

export interface IFacilityService {
   getFacilities(): Promise<FacilityResponse[]>;
   getFacilityById(id: number): Promise<FacilityResponse>;
   createFacility(data: CreateFacilityRequest): Promise<FacilityResponse>;
   updateFacility(id: number, data: UpdateFacilityRequest): Promise<FacilityResponse>;
   deleteFacility(id: number): Promise<void>;
}