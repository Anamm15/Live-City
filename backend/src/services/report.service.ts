import cloudinary from "../config/cloudinary";
import fs from "fs";
import { UploadFile } from "../dto/file.dto";
import { 
   CreateReportRequest, 
   ReportResponse, 
   UpdateReportRequest, 
   UpdateResponseReportRequest } from "../dto/report.dto";
import { FileableType, Prisma, PrismaClient } from "../generated/prisma";
import { CloudFolderName, LIMIT_REPORT_PAGE } from "../helpers/app.constants";
import { ReportMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { IReportService } from "../interfaces/services/IReportService";
import { NotFoundError } from "../utils/errors";
import { generateFilename } from "../utils/formatFilename";


export class ReportService implements IReportService {
   private reportRepository: IReportRepository;
   private fileRepository: IFileRepository;
   private prisma: PrismaClient;

   constructor(
      reportRepository: IReportRepository, 
      fileRepository: IFileRepository,
      prisma: PrismaClient) {
      this.reportRepository = reportRepository;
      this.fileRepository = fileRepository;
      this.prisma = prisma;
   }

   async getReports(page: number, filter: string): Promise<ReportResponse[]> {
      try {
         if (page < 1) page = 1;
         const offset = (page - 1) * LIMIT_REPORT_PAGE;
         const reports = await this.reportRepository.getReports(filter, offset, LIMIT_REPORT_PAGE);
         if (reports.length === 0) {
            throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
         }
         return reports;
      } catch (error) {
         throw error;
      }
   }

   async getReportById(id: number): Promise<ReportResponse | null> {
      try {
         const report = await this.reportRepository.getReportById(id);
         if (!report) {
            throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
         }
         return report;
      } catch (error) {
         throw error;
      }
   }

   async getReportsByUserId(userId: number): Promise<ReportResponse[]> {
      try {
         const reports = await this.reportRepository.getReportsByUserId(userId);
         if (reports.length === 0) {
            throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
         }
         return reports;
      } catch (error) {
         throw error;
      }
   }

   async createReport(report: CreateReportRequest, file: Express.Multer.File): Promise<ReportResponse> {
      let cloudinaryResult: any | null = null;
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
         try {
            const newReport = await this.reportRepository.createReport(report, tx);
            const newFilename = generateFilename(FileableType.REPORT, newReport.id);
            cloudinaryResult = await cloudinary.uploader.upload(file.path, {
               folder: CloudFolderName.REPORT,
               public_id: newFilename
            });
            
            fs.unlinkSync(file.path);
            const fileData: UploadFile = {
               urlFile: cloudinaryResult.secure_url,
               fileableId: newReport.id,
               fileableType: FileableType.REPORT
            };
            await this.fileRepository.uploadFile(fileData, tx);
            return newReport;
         } catch (error) {
            if (cloudinaryResult?.public_id) {
               await cloudinary.uploader.destroy(cloudinaryResult.public_id);
            }
            throw error;
         }
      });
   }

   async updateReport(id: number, report: UpdateReportRequest): Promise<ReportResponse> {
      try {
         return this.reportRepository.updateReport(id, report);
      } catch (error) {
         throw error;
      }
   }

   async updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<ReportResponse> {
      try {
         return this.reportRepository.updateResponseReport(id, report);
      } catch (error) {
         throw error;
      }
   }

   async deleteReport(id: number): Promise<void> {
      try {
         return this.reportRepository.deleteReport(id);
      } catch (error) {
         throw error;
      }
   }
}