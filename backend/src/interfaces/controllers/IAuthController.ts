import { Request, Response, NextFunction } from 'express';
import { LoginInput } from '../../validators/auth.validator';

export interface IAuthController {
   login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction): Promise<void>;
   logout(req: Request, res: Response, next: NextFunction): Promise<void>;
   refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}