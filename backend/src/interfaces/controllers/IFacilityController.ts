import { Request, Response, NextFunction } from "express";
import { CreateFacilityInput, UpdateFacilityInput } from "../../validators/facility.validator";

export interface IFacilityController {
   getFacilities(req: Request, res: Response, next: NextFunction): Promise<void>;
   getFacilityById(req: Request, res: Response, next: NextFunction): Promise<void>;
   createFacility(req: Request<{}, {}, CreateFacilityInput>, res: Response, next: NextFunction): Promise<void>;
   updateFacility(req: Request<{ id: string; }, {}, UpdateFacilityInput>, res: Response, next: NextFunction): Promise<void>;
   deleteFacility(req: Request, res: Response, next: NextFunction): Promise<void>;
}