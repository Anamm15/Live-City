import {
   CreateFamilyRequest,
   GetFamilyResponse,
   GetFamilyWithMembers,
   UpdateFamilyRequest
} from "../dto/family.dto";
import { PrismaClient } from "../generated/prisma";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";

const selectedFamilyFields = {
   id: true,
   familyNumber: true,
   headFamily: true,
   economicStatus: true,
   address: true,
   createdAt: true
}

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
         phoneNumber: true
      }
   }
}

export class FamilyRepository implements IFamilyRepository {
   private prisma: PrismaClient;

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getFamilies(): Promise<GetFamilyResponse[]> {
      try {
         const families = await this.prisma.families.findMany({
            select: selectedFamilyFields
         });
         return families;
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async getFamilyWithMembers(id: number): Promise<GetFamilyWithMembers | null> {
      try {
         const family = await this.prisma.families.findUnique({
            where: { id },
            select: selectedFamilyFieldsWithMembers
         });
         return family;
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async createFamily(family: CreateFamilyRequest): Promise<GetFamilyResponse> {
      try {
         const createdFamily = await this.prisma.families.create({
            data: family
         });
         return createdFamily;
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async updateFamily(family: UpdateFamilyRequest): Promise<GetFamilyResponse> {
      try {
         const updatedFamily = await this.prisma.families.update({
            where: { id: family.id },
            data: family
         });
         return updatedFamily;
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async deleteFamily(id: number): Promise<void> {
      try {
         await this.prisma.families.delete({
            where: { id }
         });
      } catch (error: any) {
         throw new Error(error.message);
      }
   }
}
