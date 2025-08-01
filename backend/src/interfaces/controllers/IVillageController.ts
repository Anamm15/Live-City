import { Request, Response, NextFunction } from "express";
import { CreateVillageInput, UpdateVillageInput } from "../../validators/village.validator";

export interface IVillageController {
   getVillages(req: Request, res: Response, next: NextFunction): Promise<void>;
   createVillage(req: Request<{}, {}, CreateVillageInput>, res: Response, next: NextFunction): Promise<void>;
   updateVillage(req: Request<{ id: string }, {}, UpdateVillageInput>, res: Response, next: NextFunction): Promise<void>;
   deleteVillage(req: Request, res: Response, next: NextFunction): Promise<void>;
}