import { Request, Response, NextFunction } from "express";
import { IFamilyController } from "../interfaces/controllers/IFamilyController";
import { IFamilyService } from "../interfaces/services/IFamilyService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { CommonMessage, FamilyMessage } from "../helpers/message.constants";
import { CreateFamilyInput, UpdateFamilyInput } from "../validators/family.validator";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class FamilyController implements IFamilyController {
   private familyService: IFamilyService;

   constructor(familyService: IFamilyService) {
      this.familyService = familyService;
   }

   async getFamilies(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.familyService.getFamilies();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, FamilyMessage.FAMILY_RETRIEVED))
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, FamilyMessage.FAMILY_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async getFamilyWithMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.familyService.getFamilyWithMembers(familyId);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, FamilyMessage.FAMILY_RETRIEVED))
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, FamilyMessage.FAMILY_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async createFamily(req: Request<{}, {}, CreateFamilyInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.familyService.createFamily(req.body);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(results, FamilyMessage.FAMILY_CREATED))
      } catch (error: any) {
         res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FamilyMessage.FAMILY_CREATE_FAILED))
      }
   }

   async updateFamily(req: Request<{ id: string; }, {}, UpdateFamilyInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.familyService.updateFamily(familyId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, FamilyMessage.FAMILY_UPDATED))
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FamilyMessage.FAMILY_UPDATE_FAILED));
         }
      }
   }

   async deleteFamily(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.familyService.deleteFamily(familyId);
         res.status(StatusCode.NO_CONTENT).send();
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FamilyMessage.FAMILY_DELETE_FAILED));
         }
      }
   }
}