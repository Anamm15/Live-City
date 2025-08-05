import { 
   CreateReportRequest, 
   ReportResponse, 
   UpdateReportRequest, 
   UpdateResponseReportRequest } from "../../dto/report.dto";

export interface IReportService {
   getReports(page: number, filter: string): Promise<ReportResponse[]>;
   getReportById(id: number): Promise<ReportResponse | null>;
   getReportsByUserId(userId: number): Promise<ReportResponse[]>;
   createReport(report: CreateReportRequest): Promise<ReportResponse>;
   updateReport(id: number, report: UpdateReportRequest): Promise<ReportResponse>;
   updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<ReportResponse>;
   deleteReport(id: number): Promise<void>;
}