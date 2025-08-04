import { Router } from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import submissionRoutes from './submission.route';
import reportRoutes from './report.route';
import newsRoutes from './news.route';
import familyRoutes from './family.route';
import facilityRoutes from './facility.route';

const router = Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/submissions', submissionRoutes)
router.use('/reports', reportRoutes)
router.use('/news', newsRoutes)
router.use('/families', familyRoutes)
router.use('/submissions', submissionRoutes);
router.use('/reports', reportRoutes);
router.use('/news', newsRoutes);
router.use('/facilities', facilityRoutes);

export default router;
