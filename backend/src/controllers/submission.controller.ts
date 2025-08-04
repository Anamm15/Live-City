import { Request, Response, NextFunction } from "express";
import { ISubmissionController } from "../interfaces/controllers/ISubmissionController";
import { ISubmissionService } from "../interfaces/services/ISubmissionSerivce";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateSubmissionRequest, UpdateSubmissionRequest, UpdateSubmissionStatusRequest } from "../validators/submission.validator";
import { CommonMessage, SubmissionMessage } from "../helpers/message.constants";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";


export class SubmissionController implements ISubmissionController {
   private submissionService: ISubmissionService;

   constructor(submissionService: ISubmissionService) {
      this.submissionService = submissionService;
   }

   async getSubmissions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.submissionService.getSubmissions();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, SubmissionMessage.SUBMISSION_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, SubmissionMessage.SUBMISSION_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async getSubmissionById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.submissionService.getSubmissionById(submissionId);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, SubmissionMessage.SUBMISSION_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, SubmissionMessage.SUBMISSION_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async getSubmissionsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const userId = parseInt(req.params.userId, 10);
         if (isNaN(userId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.submissionService.getSubmissionsByUserId(userId);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, SubmissionMessage.SUBMISSION_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, SubmissionMessage.SUBMISSION_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async createSubmission(req: Request<{}, {}, CreateSubmissionRequest>, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.submissionService.createSubmission(req.body);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(result, SubmissionMessage.SUBMISSION_CREATED));
      } catch (error: any) {
         res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, SubmissionMessage.SUBMISSION_CREATE_FAILED));
      }
   }

   async updateSubmission(req: Request<{ id: string; }, {}, UpdateSubmissionRequest>, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.submissionService.updateSubmission(submissionId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, SubmissionMessage.SUBMISSION_UPDATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async updateSubmissionStatus(req: Request<{ id: string; }, {}, UpdateSubmissionStatusRequest>, res: Response, next: NextFunction): Promise<void> {
       try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.submissionService.updateSubmissionStatus(submissionId, req.body.status);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, SubmissionMessage.SUBMISSION_STATUS_UPDATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async deleteSubmission(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const submissionId = parseInt(req.params.id, 10);
         if (isNaN(submissionId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.submissionService.deleteSubmission(submissionId);
         res.status(204).send();
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }
}
