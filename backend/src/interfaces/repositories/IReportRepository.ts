import { 
   CreateReportRequest, 
   ReportResponse, 
   UpdateReportRequest, 
   UpdateResponseReportRequest } from "../../dto/report.dto";

export interface IReportRepository {
   getReports(filter: string, offset: number, limit: number): Promise<ReportResponse[]>;
   getReportById(id: number): Promise<ReportResponse | null>;
   getReportsByUserId(userId: number): Promise<ReportResponse[]>;
   createReport(data: CreateReportRequest): Promise<ReportResponse>;
   updateReport(id: number, data: UpdateReportRequest): Promise<ReportResponse>;
   updateResponseReport(id: number, data: UpdateResponseReportRequest): Promise<ReportResponse>;
   deleteReport(id: number): Promise<void>;
}