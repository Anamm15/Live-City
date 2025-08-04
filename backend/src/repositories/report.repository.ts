import { CreateReportRequest, GetReportResponse, UpdateReportRequest, UpdateResponseReportRequest } from "../dto/report.dto";
import { PrismaClient } from "../generated/prisma";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { AppError } from "../utils/errors";

const reportSelectedField = {
   id: true,
   title: true,
   description: true,
   category: true,
   status: true,
   response: true,
   user: {
      select: {
         id: true,
         name: true,
         nationalIdentityNumber: true,
         email: true,
         phoneNumber: true,
      }
   }
}

export class ReportRepository implements IReportRepository {
   private prisma: PrismaClient;
      
   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }


   async getReports(): Promise<GetReportResponse[]> {
      try {
         const reports = await this.prisma.reports.findMany({
            select: reportSelectedField
         });
         return reports;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getReportById(id: number): Promise<GetReportResponse | null> {
      try {
         const report = await this.prisma.reports.findUnique({
            where: { id },
            select: reportSelectedField
         });
         return report;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getReportsByUserId(userId: number): Promise<GetReportResponse[]> {
      try {   
         const reports = await this.prisma.reports.findMany({
            where: { userId },
            select: reportSelectedField
         });
         return reports;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async createReport(report: CreateReportRequest): Promise<GetReportResponse> {
       try {
         const newReport = await this.prisma.reports.create({
            data: report
         });
         return newReport;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateReport(id: number, report: UpdateReportRequest): Promise<GetReportResponse> {
      try {
         const updatedReport = await this.prisma.reports.update({
            where: { id: id },
            data: report
         });
         return updatedReport;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<GetReportResponse> {
      try {
         const updatedReport = await this.prisma.reports.update({
            where: { id: id },
            data: report
         })
         return updatedReport;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async deleteReport(id: number): Promise<void> {
      try {
         await this.prisma.reports.delete({
            where: { id }
         })
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }
}