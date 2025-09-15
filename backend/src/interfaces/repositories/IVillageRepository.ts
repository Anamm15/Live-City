import {
  CreateVillageRequest,
  VillageResponse,
  UpdateVillageRequest,
} from "../../dto/villages.dto";
import { Prisma } from "@prisma/client";

export interface IVillageRepository {
  getVillages(): Promise<VillageResponse[]>;
  createVillage(
    data: CreateVillageRequest,
    tx: Prisma.TransactionClient
  ): Promise<VillageResponse>;
  updateVillage(
    id: number,
    data: UpdateVillageRequest
  ): Promise<VillageResponse>;
  deleteVillage(id: number): Promise<void>;
}
