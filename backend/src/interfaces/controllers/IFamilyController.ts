import { Request, Response, NextFunction } from 'express';
import { CreateFamilyInput, UpdateFamilyInput } from '../../validators/family.validator';

export interface IFamilyController {
   getFamilies(req: Request, res: Response, next: NextFunction): Promise<void>;
   getFamilyWithMembers(req: Request, res: Response, next: NextFunction): Promise<void>;
   createFamily(req: Request<{}, {}, CreateFamilyInput>, res: Response, next: NextFunction): Promise<void>;
   updateFamily(req: Request<{ id: string; }, {}, UpdateFamilyInput>, res: Response, next: NextFunction): Promise<void>;
   deleteFamily(req: Request, res: Response, next: NextFunction): Promise<void>;
}
