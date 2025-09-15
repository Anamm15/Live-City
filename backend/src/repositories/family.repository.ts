import {
  CreateFamilyRequest,
  FamilyResponse,
  FamilyWithMembersResponse,
  UpdateFamilyRequest,
} from "../dto/family.dto";
import { PrismaClient } from "@prisma/client";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";
import { AppError } from "../utils/errors";

const selectedFamilyFields = {
  id: true,
  familyNumber: true,
  headFamily: true,
  economicStatus: true,
  address: true,
  createdAt: true,
};

const selectedFamilyFieldsWithMembers = {
  id: true,
  familyNumber: true,
  headFamily: true,
  economicStatus: true,
  address: true,
  createdAt: true,
  users: {
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  },
};

export class FamilyRepository implements IFamilyRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getFamilies(): Promise<FamilyResponse[]> {
    try {
      const families = await this.prisma.families.findMany({
        select: selectedFamilyFields,
      });
      return families;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getFamilyWithMembers(
    id: number
  ): Promise<FamilyWithMembersResponse | null> {
    try {
      const family = await this.prisma.families.findUnique({
        where: { id },
        select: selectedFamilyFieldsWithMembers,
      });
      return family;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async createFamily(data: CreateFamilyRequest): Promise<FamilyResponse> {
    try {
      const createdFamily = await this.prisma.families.create({
        data,
        select: selectedFamilyFields,
      });
      return createdFamily;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateFamily(
    id: number,
    data: UpdateFamilyRequest
  ): Promise<FamilyResponse> {
    try {
      const updatedFamily = await this.prisma.families.update({
        where: { id },
        data,
        select: selectedFamilyFields,
      });
      return updatedFamily;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteFamily(id: number): Promise<void> {
    try {
      await this.prisma.families.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
