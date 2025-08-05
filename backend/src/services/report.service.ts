import { 
   CreateReportRequest, 
   ReportResponse, 
   UpdateReportRequest, 
   UpdateResponseReportRequest } from "../dto/report.dto";
import { LIMIT_REPORT_PAGE } from "../helpers/app.constants";
import { ReportMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { IReportService } from "../interfaces/services/IReportService";
import { NotFoundError } from "../utils/errors";


export class ReportService implements IReportService {
   private reportRepository: IReportRepository;
   private fileRepository: IFileRepository;

   constructor(reportRepository: IReportRepository, fileRepository: IFileRepository) {
      this.reportRepository = reportRepository;
      this.fileRepository = fileRepository;
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

   async createReport(report: CreateReportRequest): Promise<ReportResponse> {
      try {
         return this.reportRepository.createReport(report);
      } catch (error) {
         throw error;
      }
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