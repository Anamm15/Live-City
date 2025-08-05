import { 
   CreateVillageRequest, 
   VillageResponse, 
   UpdateVillageRequest } from "../../dto/villages.dto";

export interface IVillageService {
   getVillages(): Promise<VillageResponse[]>;
   createVillage(data: CreateVillageRequest): Promise<VillageResponse>;
   updateVillage(id: number, data: UpdateVillageRequest): Promise<VillageResponse>;
   deleteVillage(id: number): Promise<void>;
}