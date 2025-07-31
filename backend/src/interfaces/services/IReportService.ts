import { CreateReportRequest, GetReportResponse, UpdateReportRequest, UpdateResponseReportRequest } from "../../dto/report.dto";

export interface IReportService {
   getReports(): Promise<GetReportResponse[]>;
   getReportById(id: number): Promise<GetReportResponse | null>;
   getReportsByUserId(userId: number): Promise<GetReportResponse[]>;
   createReport(report: CreateReportRequest): Promise<GetReportResponse>;
   updateReport(id: number, report: UpdateReportRequest): Promise<GetReportResponse>;
   updateResponseReport(id: number, report: UpdateResponseReportRequest): Promise<GetReportResponse>;
   deleteReport(id: number): Promise<void>;
}