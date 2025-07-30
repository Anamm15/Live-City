import { CreateReportRequest, GetReportResponse, UpdateReportRequest, UpdateResponseReportRequest } from "../dto/report.dto";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { IReportService } from "../interfaces/services/IReportService";


export class ReportService implements IReportService {
   private reportRepository: IReportRepository;

   constructor(reportRepository: IReportRepository) {
      this.reportRepository = reportRepository;
   }

   async getReports(): Promise<GetReportResponse[]> {
      try {
         return this.reportRepository.getReports();
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async getReportById(id: number): Promise<GetReportResponse | null> {
      try {
         return this.reportRepository.getReportById(id);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async getReportsByUserId(userId: number): Promise<GetReportResponse[]> {
      try {
         return this.reportRepository.getReportsByUserId(userId);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async createReport(report: CreateReportRequest): Promise<GetReportResponse> {
      try {
         return this.reportRepository.createReport(report);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async updateReport(id: number, report: UpdateReportRequest): Promise<GetReportResponse> {
      try {
         return this.reportRepository.updateReport(id, report);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<GetReportResponse> {
      try {
         return this.reportRepository.updateResponseReport(id, report);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }

   async deleteReport(id: number): Promise<void> {
      try {
         return this.reportRepository.deleteReport(id);
      } catch (error: any) {
         throw new Error("Failed to get reports: " + error.message);
      }
   }
}