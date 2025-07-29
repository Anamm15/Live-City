import { Router } from 'express';
import prisma from '../database/prisma';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { LoginSchema } from '../validators/auth.validator';

const router = Router();

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/login', validate(LoginSchema), authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));

export default router;