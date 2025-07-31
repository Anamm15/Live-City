import { Request, Response, NextFunction } from "express";
import { CreateReportInput, UpdateReportInput, UpdateResponseReportInput } from "../../validators/report.validator";

export interface IReportController {
   getReports(req: Request, res: Response, next: NextFunction): Promise<void>;
   getReportById(req: Request, res: Response, next: NextFunction): Promise<void>;
   getReportsByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
   createReport(req: Request<{}, {}, CreateReportInput>, res: Response, next: NextFunction): Promise<void>;
   updateReport(req: Request<{ id: string; }, {}, UpdateReportInput>, res: Response, next: NextFunction): Promise<void>;
   updateResponseReport(req: Request<{ id: string; }, {}, UpdateResponseReportInput>, res: Response, next: NextFunction): Promise<void>;
   deleteReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}