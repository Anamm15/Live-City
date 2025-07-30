import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import prisma from '../database/prisma';
import authMiddleware from '../middlewares/authentication';
import { validate } from '../middlewares/validate';
import { CreateUserSchema, UpdateUserSchema } from '../validators/user.validator';

const router = Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.post('/', validate(CreateUserSchema), userController.createUser.bind(userController));
router.patch('/:id', validate(UpdateUserSchema), authMiddleware, userController.updateUser.bind(userController));
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router;
