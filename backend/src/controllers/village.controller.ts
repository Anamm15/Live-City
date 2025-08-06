import { CommonMessage, VillageMessage } from "../helpers/message.constants";
import { IVillageController } from "../interfaces/controllers/IVillageController";
import { IVillageService } from "../interfaces/services/IVillageService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { CreateVillageInput, UpdateVillageInput } from "../validators/village.validator";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";


export class VillageController implements IVillageController {
   private villageService: IVillageService;

   constructor(villageService: IVillageService) {
      this.villageService = villageService;
   }

   async getVillages(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.villageService.getVillages();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, VillageMessage.VILLAGE_RETRIEVED));
      } catch (error: any) {
        if (error instanceof NotFoundError) {
           res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, VillageMessage.VILLAGE_NOT_FOUND));
        } else {
           res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
        }
      }    
   }

   async createVillage(req: Request<{}, {}, CreateVillageInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         if (!req.file) {
            throw new BadRequestError(CommonMessage.FILE_NOT_FOUND);
         }
         const results = await this.villageService.createVillage(req.body, req.file);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(results, VillageMessage.VILLAGE_CREATED));
      } catch (error: any) {
         res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, VillageMessage.VILLAGE_CREATE_FAILED));
      }
   }

   async updateVillage(req: Request<{ id: string; }, {}, UpdateVillageInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const villageId = parseInt(req.params.id, 10);
         if (isNaN(villageId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.villageService.updateVillage(villageId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, VillageMessage.VILLAGE_UPDATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, VillageMessage.VILLAGE_UPDATE_FAILED));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }

   async deleteVillage(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const villageId = parseInt(req.params.id, 10);
         if (isNaN(villageId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.villageService.deleteVillage(villageId);
         res.status(204).send(buildResponseSuccess(null, VillageMessage.VILLAGE_DELETED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, VillageMessage.VILLAGE_DELETE_FAILED));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }
}