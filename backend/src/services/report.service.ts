import { CreateReportRequest, GetReportResponse, UpdateReportRequest, UpdateResponseReportRequest } from "../dto/report.dto";
import { ReportMessage } from "../helpers/message.constants";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { IReportService } from "../interfaces/services/IReportService";
import { NotFoundError } from "../utils/errors";


export class ReportService implements IReportService {
   private reportRepository: IReportRepository;

   constructor(reportRepository: IReportRepository) {
      this.reportRepository = reportRepository;
   }

   async getReports(): Promise<GetReportResponse[]> {
      try {
         const reports = await this.reportRepository.getReports();
         if (reports.length === 0) {
            throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
         }
         return reports;
      } catch (error) {
         throw error;
      }
   }

   async getReportById(id: number): Promise<GetReportResponse | null> {
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

   async getReportsByUserId(userId: number): Promise<GetReportResponse[]> {
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

   async createReport(report: CreateReportRequest): Promise<GetReportResponse> {
      try {
         return this.reportRepository.createReport(report);
      } catch (error) {
         throw error;
      }
   }

   async updateReport(id: number, report: UpdateReportRequest): Promise<GetReportResponse> {
      try {
         return this.reportRepository.updateReport(id, report);
      } catch (error) {
         throw error;
      }
   }

   async updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<GetReportResponse> {
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