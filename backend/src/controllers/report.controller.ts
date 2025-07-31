import { Request, Response, NextFunction } from "express";
import { IReportController } from "../interfaces/controllers/IReportController";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateReportInput, UpdateReportInput, UpdateResponseReportInput } from "../validators/report.validator";
import { IReportService } from "../interfaces/services/IReportService";

export class ReportController implements IReportController {
   private reportService: IReportService;

   constructor(reportService: IReportService) {
      this.reportService = reportService;
   }

   async getReports(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.reportService.getReports();
         res.status(200).send(buildResponseSuccess(results, "Reports fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch reports"));
      }   
   }

   async getReportById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new Error("Invalid report ID");
         }
         const result = await this.reportService.getReportById(reportId);
         res.status(200).send(buildResponseSuccess(result, "Report fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch report"));
      }   
   }

   async getReportsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = parseInt(req.params.id, 10);
         if (isNaN(userId)) {
            throw new Error("Invalid user ID");
         }
         const results = await this.reportService.getReportsByUserId(userId);
         res.status(200).send(buildResponseSuccess(results, "Reports fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch reports"));
      }   
   }

   async createReport(req: Request<{}, {}, CreateReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.reportService.createReport(req.body);
         res.status(201).send(buildResponseSuccess(results, "Report created successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to create report"));
      }   
   }

   async updateReport(req: Request<{ id: string; }, {}, UpdateReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new Error("Invalid report ID");
         }
         const result = await this.reportService.updateReport(reportId, req.body);
         res.status(200).send(buildResponseSuccess(result, "Report updated successfully")); 
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to update report"));
      }   
   }

   async updateResponseReport(req: Request<{ id: string; }, {}, UpdateResponseReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new Error("Invalid report ID");
         }
         const result = await this.reportService.updateResponseReport(reportId, req.body);
         res.status(200).send(buildResponseSuccess(result, "Report updated successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to update report"));
      }   
   }

   async deleteReport(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new Error("Invalid report ID");
         }
         await this.reportService.deleteReport(reportId);
         res.status(204).send();
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to delete report"));
      }   
   }
}