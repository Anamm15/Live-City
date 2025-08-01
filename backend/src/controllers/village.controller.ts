import { VillageMessage } from "../helpers/message.constants";
import { IVillageController } from "../interfaces/controllers/IVillageController";
import { IVillageService } from "../interfaces/services/IVillageService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { CreateVillageInput, UpdateVillageInput } from "../validators/village.validator";


export class VillageController implements IVillageController {
   private villageService: IVillageService;

   constructor(villageService: IVillageService) {
      this.villageService = villageService;
   }

   async getVillages(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.villageService.getVillages();
         res.status(200).send(buildResponseSuccess(results, VillageMessage.VILLAGE_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, VillageMessage.VILLAGE_RETRIEVE_FAILED));
      }    
   }

   async createVillage(req: Request<{}, {}, CreateVillageInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.villageService.createVillage(req.body);
         res.status(201).send(buildResponseSuccess(results, VillageMessage.VILLAGE_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, VillageMessage.VILLAGE_CREATE_FAILED));
      }
   }

   async updateVillage(req: Request<{ id: string; }, {}, UpdateVillageInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.villageService.updateVillage(parseInt(req.params.id, 10), req.body);
         res.status(200).send(buildResponseSuccess(results, VillageMessage.VILLAGE_UPDATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, VillageMessage.VILLAGE_UPDATE_FAILED));
      }
   }

   async deleteVillage(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         await this.villageService.deleteVillage(parseInt(req.params.id, 10));
         res.status(204).send(buildResponseSuccess(null, VillageMessage.VILLAGE_DELETED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, VillageMessage.VILLAGE_DELETE_FAILED));
      }
   }
}