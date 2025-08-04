import { CreateVillageRequest, GetResponseVillage, UpdateVillageRequest } from "../../dto/villages.dto";

export interface IVillageService {
   getVillages(): Promise<GetResponseVillage[]>;
   createVillage(data: CreateVillageRequest): Promise<GetResponseVillage>;
   updateVillage(id: number, data: UpdateVillageRequest): Promise<GetResponseVillage>;
   deleteVillage(id: number): Promise<void>;
}