import {
  CreateFacilityRequest,
  FacilityResponse,
  UpdateFacilityRequest,
} from "../../dto/facility.dto";
import { Prisma } from "@prisma/client";

export interface IFacilityRepository {
  getFacilities(): Promise<FacilityResponse[]>;
  getFacilityById(id: number): Promise<FacilityResponse | null>;
  createFacility(
    data: CreateFacilityRequest,
    tx: Prisma.TransactionClient
  ): Promise<FacilityResponse>;
  updateFacility(
    id: number,
    data: UpdateFacilityRequest
  ): Promise<FacilityResponse>;
  deleteFacility(id: number): Promise<void>;
}
