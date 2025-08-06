import { 
   CreateReportRequest, 
   ReportResponse, 
   UpdateReportRequest, 
   UpdateResponseReportRequest } from "../../dto/report.dto";

export interface IReportService {
   getReports(page: number, filter: string): Promise<ReportResponse[]>;
   getReportById(id: number): Promise<ReportResponse | null>;
   getReportsByUserId(userId: number): Promise<ReportResponse[]>;
   createReport(userId: number, report: CreateReportRequest, file: Express.Multer.File): Promise<ReportResponse>;
   updateReport(id: number, userId: number, report: UpdateReportRequest): Promise<ReportResponse>;
   updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<ReportResponse>;
   deleteReport(id: number, userId: number): Promise<void>;
}