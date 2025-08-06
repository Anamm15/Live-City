import { 
   CreateFacilityRequest, 
   FacilityResponse, 
   UpdateFacilityRequest } from "../dto/facility.dto";
import { Prisma, PrismaClient } from "../generated/prisma";
import { IFacilityRepository } from "../interfaces/repositories/IFacilityRepository";
import { AppError } from "../utils/errors";

const selectedFacilityFields = {
   id: true,
   name: true,
   description: true,
   latitude: true,
   longitude: true,
   buildDate: true
}

export class FacilityRepository implements IFacilityRepository {
   private prisma: PrismaClient

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getFacilities(): Promise<FacilityResponse[]> {
      try {
         const facilities = await this.prisma.facilities.findMany({
            select: selectedFacilityFields,
            orderBy: { name: "asc" }
         });
         return facilities;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getFacilityById(id: number): Promise<FacilityResponse | null> {
      try {
         const facility = await this.prisma.facilities.findUnique({
            where: { id },
            select: selectedFacilityFields
         });
         return facility;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async createFacility(data: CreateFacilityRequest, tx: Prisma.TransactionClient): Promise<FacilityResponse> {
      try {
         const newFacility = await tx.facilities.create({
            data,
            select: selectedFacilityFields
         });
         return newFacility;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateFacility(id: number, data: UpdateFacilityRequest): Promise<FacilityResponse> {
      try {
         const updatedFacility = await this.prisma.facilities.update({
            where: { id: id},
            data,
            select: selectedFacilityFields
         });
         return updatedFacility;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async deleteFacility(id: number): Promise<void> {
      try {
      await this.prisma.facilities.delete({
         where: { id }
      });
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }
}