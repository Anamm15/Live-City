import { CommonMessage, FacilityMessage } from "../helpers/message.constants";
import { IFacilityController } from "../interfaces/controllers/IFacilityController";
import { IFacilityService } from "../interfaces/services/IFacilityService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { Request, Response, NextFunction } from "express";
import { CreateFacilityInput, UpdateFacilityInput } from "../validators/facility.validator";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";


export class FacilityController implements IFacilityController {
   private facilityService: IFacilityService;

   constructor(facilityService: IFacilityService) {
      this.facilityService = facilityService;
   }

   async getFacilities(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.facilityService.getFacilities();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, FacilityMessage.FACILITY_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, FacilityMessage.FACILITY_NOT_FOUND));
         }
         else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }    
   }

   async getFacilityById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const facilityId = parseInt(req.params.id, 10);
         if (isNaN(facilityId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.facilityService.getFacilityById(facilityId);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, FacilityMessage.FACILITY_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, FacilityMessage.FACILITY_NOT_FOUND));
         }
         else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         }
         else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async createFacility(req: Request<{}, {}, CreateFacilityInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         if (!req.file) {
            throw new BadRequestError(CommonMessage.FILE_NOT_FOUND);
         }
         const result = await this.facilityService.createFacility(req.body, req.file);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(result, FacilityMessage.FACILITY_CREATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.FILE_NOT_FOUND));
         }
         else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FacilityMessage.FACILITY_CREATE_FAILED));
         }
      }   
   }

   async updateFacility(req: Request<{ id: string; }, {}, UpdateFacilityInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const facilityId = parseInt(req.params.id, 10);
         if (isNaN(facilityId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.facilityService.updateFacility(facilityId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, FacilityMessage.FACILITY_UPDATED));
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         }
         else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FacilityMessage.FACILITY_UPDATE_FAILED));
         }
      }   
   }

   async deleteFacility(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const facilityId = parseInt(req.params.id, 10);
         if (isNaN(facilityId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.facilityService.deleteFacility(facilityId);
         res.status(StatusCode.NO_CONTENT).send();
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         }
         else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, FacilityMessage.FACILITY_DELETE_FAILED));
         }
      }   
   }
}