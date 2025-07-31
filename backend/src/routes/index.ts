import { Router } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import submissionRoutes from './submission.route';
import newsRoutes from './news.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/submissions', submissionRoutes)
router.use('/news', newsRoutes)

export default router;
