import { Request, Response, NextFunction } from "express";
import { ISubmissionController } from "../interfaces/controllers/ISubmissionController";
import { ISubmissionService } from "../interfaces/services/ISubmissionSerivce";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateSubmissionRequest, UpdateSubmissionRequest, UpdateSubmissionStatusRequest } from "../validators/submission.validator";


export class SubmissionController implements ISubmissionController {
   private submissionService: ISubmissionService;

   constructor(submissionService: ISubmissionService) {
      this.submissionService = submissionService;
   }

   async getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissions = await this.submissionService.getSubmissions();
         res.status(200).send(buildResponseSuccess(submissions, "Submissions fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch submissions"));
      }
   }

   async getSubmissionById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new Error("Invalid submission ID");
         }
         const submission = await this.submissionService.getSubmissionById(submissionId);
         res.status(200).send(buildResponseSuccess(submission, "Submission fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch submission"));
      }
   }

   async getSubmissionsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = parseInt(req.params.userId, 10);
         if (isNaN(userId)) {
            throw new Error("Invalid user ID");
         }
         const submissions = await this.submissionService.getSubmissionsByUserId(userId);
         res.status(200).send(buildResponseSuccess(submissions, "Submissions fetched successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to fetch submissions"));
      }
   }

   async createSubmission(req: Request<{}, {}, CreateSubmissionRequest>, res: Response, next: NextFunction): Promise<void> {
      try {
         const submission = await this.submissionService.createSubmission(req.body);
         res.status(201).send(buildResponseSuccess(submission, "Submission created successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to create submission"));
      }
   }

   async updateSubmission(req: Request<{ id: string; }, {}, UpdateSubmissionRequest>, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new Error("Invalid submission ID");
         }
         const submission = await this.submissionService.updateSubmission(submissionId, req.body);
         res.status(200).send(buildResponseSuccess(submission, "Submission updated successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to update submission"));
      }
   }

   async updateSubmissionStatus(req: Request<{ id: string; }, {}, UpdateSubmissionStatusRequest>, res: Response, next: NextFunction): Promise<void> {
       try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new Error("Invalid submission ID");
         }
         const updatedSubmission = await this.submissionService.updateSubmissionStatus(submissionId, req.body.status);
         res.status(200).send(buildResponseSuccess(updatedSubmission, "Submission status updated successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to update submission status"));
      }
   }

   async deleteSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new Error("Invalid submission ID");
         }
         await this.submissionService.deleteSubmission(submissionId);
         res.status(204).send();
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "Failed to delete submission"));
      }
   }
}
