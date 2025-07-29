import { IUserController } from "../interfaces/controllers/IUserController";
import { Request, Response, NextFunction } from 'express';
import { IUserService } from "../interfaces/services/IUserService";
import { buildResponseSuccess, buildResponseError } from "../utils/response";
import { CreateUserInput, UpdateUserInput } from "../validators/user.validator";

export class UserController implements IUserController {
   private userService: IUserService;

   constructor(userService: IUserService) {
      this.userService = userService;
   }
   
   async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const users = await this.userService.getUsers();
         res.status(200).send(buildResponseSuccess(users, "Users retrieved successfully"));
      } catch (error: any) {
         res.status(500).send(buildResponseError(error.message, "Failed to retrieve users"));
      }
   }

   async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
      const userId = parseInt(req.params.id, 10);
      try {
         const user = await this.userService.getUserById(userId);
         res.status(200).send(buildResponseSuccess(user, "User retrieved successfully"));
      } catch (error: any) {
         res.status(500).send(buildResponseError(error.message, "Failed to retrieve user"));
      }
   }

   async createUser(req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const newUser = await this.userService.createUser(req.body);
         res.status(201).send(buildResponseSuccess(newUser, "User created successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "User creation failed"));
      }
   }

   async updateUser(req: Request<{ id: string; }, {}, UpdateUserInput>, res: Response, next: NextFunction): Promise<void> {
      const userId = parseInt(req.params.id, 10);
      try {
         const updatedUser = await this.userService.updateUser(userId, req.body);
         res.status(200).send(buildResponseSuccess(updatedUser, "User updated successfully"));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, "User update failed"));
      }
   }

   async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
      const userId = parseInt(req.params.id, 10);
      try {
         await this.userService.deleteUser(userId);
         res.status(204).send(buildResponseSuccess(null, "User deleted successfully"));
      } catch (error: any) {
         res.status(500).send(buildResponseError(error.message, "User deletion failed"));
      }
   }
}