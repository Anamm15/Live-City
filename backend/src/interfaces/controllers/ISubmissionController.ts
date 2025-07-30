import { Request, Response, NextFunction } from 'express';

export interface ISubmissionController {
   getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void>;
   getSubmissionById(req: Request, res: Response, next: NextFunction): Promise<void>;
   getSubmissionsByUserId(req: Request, res: Response, next: NextFunction): Promise<void>;
   createSubmission(req: Request, res: Response, next: NextFunction): Promise<void>;
   updateSubmission(req: Request, res: Response, next: NextFunction): Promise<void>;
   updateSubmissionStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
   deleteSubmission(req: Request, res: Response, next: NextFunction): Promise<void>;
}