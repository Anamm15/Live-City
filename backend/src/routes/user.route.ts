import { Router } from 'express';
import authMiddleware from '../middlewares/authentication';
import { validate } from '../middlewares/validate';
import { CreateUserSchema, UpdateUserSchema } from '../validators/user.validator';
import { IUserController } from '../interfaces/controllers/IUserController';
import authorizeRoles from '../middlewares/authorization';
import { Role } from '../generated/prisma';

export class UserRoutes {
   private router: Router;
   private userController: IUserController;

   constructor(userController: IUserController) {
      this.router = Router();
      this.userController = userController;
      this.configureRoutes();
   }

   private configureRoutes() {
      this.router.get('/', authMiddleware, this.userController.getUsers.bind(this.userController));
      this.router.get('/:id', authMiddleware, this.userController.getUserById.bind(this.userController));
      this.router.post('/', authMiddleware, validate(CreateUserSchema), this.userController.createUser.bind(this.userController));
      this.router.patch('/:id', authMiddleware, validate(UpdateUserSchema), this.userController.updateUser.bind(this.userController));
      this.router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), this.userController.deleteUser.bind(this.userController));
      return this.router;
   }

   public getRoutes() {
      return this.router;
   }
}
