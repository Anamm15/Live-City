import { Router } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import submissionRoutes from './submission.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/submissions', submissionRoutes)

export default router;
