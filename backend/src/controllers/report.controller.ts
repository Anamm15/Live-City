import { Request, Response, NextFunction } from "express";
import { IReportController } from "../interfaces/controllers/IReportController";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateReportInput, UpdateReportInput, UpdateResponseReportInput } from "../validators/report.validator";
import { IReportService } from "../interfaces/services/IReportService";
import { CommonMessage, ReportMessage } from "../helpers/message.constants";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class ReportController implements IReportController {
   private reportService: IReportService;

   constructor(reportService: IReportService) {
      this.reportService = reportService;
   }

   async getReports(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.reportService.getReports();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, ReportMessage.REPORT_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, ReportMessage.REPORT_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async getReportById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.reportService.getReportById(reportId);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, ReportMessage.REPORT_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, ReportMessage.REPORT_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async getReportsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = parseInt(req.params.id, 10);
         if (isNaN(userId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.reportService.getReportsByUserId(userId);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, ReportMessage.REPORT_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, ReportMessage.REPORT_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async createReport(req: Request<{}, {}, CreateReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.reportService.createReport(req.body);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(results, ReportMessage.REPORT_CREATED));
      } catch (error: any) {
         res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, ReportMessage.REPORT_CREATE_FAILED));
      }   
   }

   async updateReport(req: Request<{ id: string; }, {}, UpdateReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.reportService.updateReport(reportId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, ReportMessage.REPORT_UPDATED)); 
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, ReportMessage.REPORT_UPDATE_FAILED));
         }
      }   
   }

   async updateResponseReport(req: Request<{ id: string; }, {}, UpdateResponseReportInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.reportService.updateResponseReport(reportId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, ReportMessage.REPORT_RESPONSE_UPDATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, ReportMessage.REPORT_RESPONSE_UPDATE_FAILED));
         }
      }   
   }

   async deleteReport(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const reportId = parseInt(req.params.id, 10);
         if (isNaN(reportId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.reportService.deleteReport(reportId);
         res.status(StatusCode.NO_CONTENT).send();
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, ReportMessage.REPORT_DELETE_FAILED));
         }
      }   
   }
}