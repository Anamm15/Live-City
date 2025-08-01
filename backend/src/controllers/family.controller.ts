import { Request, Response, NextFunction } from "express";
import { IFamilyController } from "../interfaces/controllers/IFamilyController";
import { IFamilyService } from "../interfaces/services/IFamilyService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { FamilyMessage } from "../helpers/message.constants";
import { CreateFamilyInput, UpdateFamilyInput } from "../validators/family.validator";

export class FamilyController implements IFamilyController {
   private familyService: IFamilyService;

   constructor(familyService: IFamilyService) {
      this.familyService = familyService;
   }

   async getFamilies(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.familyService.getFamilies();
         res.status(200).send(buildResponseSuccess(results, FamilyMessage.FAMILY_RETRIEVED))
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FamilyMessage.FAMILY_RETRIEVE_FAILED))
      }
   }

   async getFamilyWithMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new Error("Invalid family id");
         }
         const results = await this.familyService.getFamilyWithMembers(familyId);
         res.status(200).send(buildResponseSuccess(results, FamilyMessage.FAMILY_RETRIEVED))
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FamilyMessage.FAMILY_RETRIEVE_FAILED))
      }
   }

   async createFamily(req: Request<{}, {}, CreateFamilyInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.familyService.createFamily(req.body);
         res.status(201).send(buildResponseSuccess(results, FamilyMessage.FAMILY_CREATED))
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FamilyMessage.FAMILY_CREATE_FAILED))
      }
   }

   async updateFamily(req: Request<{ id: string; }, {}, UpdateFamilyInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new Error("Invalid family id");
         }
         const results = await this.familyService.updateFamily(familyId, req.body);
         res.status(200).send(buildResponseSuccess(results, FamilyMessage.FAMILY_UPDATED))
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FamilyMessage.FAMILY_UPDATE_FAILED))
      }
   }

   async deleteFamily(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const familyId = parseInt(req.params.id, 10);
         if (isNaN(familyId)) {
            throw new Error("Invalid family id");
         }
         await this.familyService.deleteFamily(familyId);
         res.status(204).send(buildResponseSuccess(null, FamilyMessage.FAMILY_DELETED))
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FamilyMessage.FAMILY_DELETE_FAILED))
      }
   }
}