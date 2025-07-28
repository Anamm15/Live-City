export interface IReportRepository {
   getReports(): Promise<Report[]>;
   getReportById(reportId: string): Promise<Report | null>;
   getReportsByUserId(userId: string): Promise<Report[]>;
   createReport(report: Report): Promise<Report>;
   updateReport(report: Report): Promise<Report>;
   updateResponseReport(reportId: string, response: string): Promise<Report>;
   deleteReport(reportId: string): Promise<void>;
}