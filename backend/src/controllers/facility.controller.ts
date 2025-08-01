import { FacilityMessage } from "../helpers/message.constants";
import { IFacilityController } from "../interfaces/controllers/IFacilityController";
import { IFacilityService } from "../interfaces/services/IFacilityService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { CreateFacilityInput, UpdateFacilityInput } from "../validators/facility.validator";


export class FacilityController implements IFacilityController {
   private facilityService: IFacilityService;

   constructor(facilityService: IFacilityService) {
      this.facilityService = facilityService;
   }

   async getFacilities(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.facilityService.getFacilities();
         res.status(200).send(buildResponseSuccess(results, FacilityMessage.FACILITY_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FacilityMessage.FACILITY_RETRIEVE_FAILED));
      }    
   }

   async getFacilityById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.facilityService.getFacilityById(parseInt(req.params.id, 10));
         res.status(200).send(buildResponseSuccess(result, FacilityMessage.FACILITY_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FacilityMessage.FACILITY_RETRIEVE_FAILED));
      }   
   }

   async createFacility(req: Request<{}, {}, CreateFacilityInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.facilityService.createFacility(req.body);
         res.status(201).send(buildResponseSuccess(result, FacilityMessage.FACILITY_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FacilityMessage.FACILITY_CREATE_FAILED));
      }   
   }

   async updateFacility(req: Request<{ id: string; }, {}, UpdateFacilityInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const facilityId = parseInt(req.params.id, 10);
         if (isNaN(facilityId)) {
            throw new Error("Invalid facility ID");
         }
         const result = await this.facilityService.updateFacility(facilityId, req.body);
         res.status(200).send(buildResponseSuccess(result, FacilityMessage.FACILITY_UPDATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FacilityMessage.FACILITY_UPDATE_FAILED));
      }   
   }

   async deleteFacility(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const facilityId = parseInt(req.params.id, 10);
         if (isNaN(facilityId)) {
            throw new Error("Invalid facility ID");
         }
         await this.facilityService.deleteFacility(facilityId);
         res.status(204).send();
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, FacilityMessage.FACILITY_DELETE_FAILED));
      }   
   }
}