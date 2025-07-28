export interface IReportController {
   createReport(userId: string, content: string): Promise<Report>;
   getReportsByUserId(userId: string): Promise<Report[]>;
   updateReport(reportId: string, content: string): Promise<Report>;
   deleteReport(reportId: string): Promise<void>;
}