import { Request, Response, NextFunction } from 'express';
import { CreateUserInput, UpdateUserInput } from '../../validators/user.validator';

export interface IUserController {
   getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
   getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
   createUser(req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction): Promise<void>;
   updateUser(req: Request<{ id: string; }, {}, UpdateUserInput>, res: Response, next: NextFunction): Promise<void>;
   deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
