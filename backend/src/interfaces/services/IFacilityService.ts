import { CreateFacilityRequest, GetFacilityResponse, UpdateFacilityRequest } from "../../dto/facility.dto";


export interface IFacilityService {
   getFacilities(): Promise<GetFacilityResponse[]>;
   getFacilityById(id: number): Promise<GetFacilityResponse>;
   createFacility(data: CreateFacilityRequest): Promise<GetFacilityResponse>;
   updateFacility(id: number, data: UpdateFacilityRequest): Promise<GetFacilityResponse>;
   deleteFacility(id: number): Promise<void>;
}