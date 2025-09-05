import {
  CreateVillageRequest,
  VillageResponse,
  UpdateVillageRequest,
} from "../dto/villages.dto";
import { Prisma, PrismaClient } from "../generated/prisma";
import { IVillageRepository } from "../interfaces/repositories/IVillageRepository";
import { AppError } from "../utils/errors";

const selectedVillageFields = {
  id: true,
  name: true,
  postalCode: true,
  latitude: true,
  longitude: true,
  createdAt: true,
};

export class VillageRepository implements IVillageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getVillages(): Promise<VillageResponse[]> {
    try {
      const villages = await this.prisma.villages.findMany({
        select: selectedVillageFields,
      });
      return villages;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async createVillage(
    data: CreateVillageRequest,
    tx: Prisma.TransactionClient
  ): Promise<VillageResponse> {
    try {
      const newVillage = await tx.villages.create({
        data,
        select: selectedVillageFields,
      });
      return newVillage;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateVillage(
    id: number,
    data: UpdateVillageRequest
  ): Promise<VillageResponse> {
    try {
      const updatedVillage = await this.prisma.villages.update({
        where: { id },
        data,
        select: selectedVillageFields,
      });
      return updatedVillage;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteVillage(id: number): Promise<void> {
    try {
      await this.prisma.villages.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
