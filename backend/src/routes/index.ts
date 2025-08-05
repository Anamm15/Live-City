import { 
   authController, 
   facilityController, 
   familyController, 
   newsController, 
   pollController, 
   reportController, 
   submissionController, 
   userController, 
   villageController } from '../controllers';
import { Router } from 'express';
import { AuthRoutes } from './auth.route';
import { FacilityRoutes } from './facility.route';
import { UserRoutes } from './user.route';
import { VillageRoutes } from './village.route';
import { FamilyRoutes } from './family.route';
import { NewsRoutes } from './news.route';
import { ReportRoutes } from './report.route';
import { SubmissionRoutes } from './submission.route';
import { PollRoutes } from './poll.route';

const router = Router();
const authRoutes = new AuthRoutes(authController);
const userRoutes = new UserRoutes(userController);
const facilityRoutes = new FacilityRoutes(facilityController);
const villageRoutes = new VillageRoutes(villageController);
const familyRoutes = new FamilyRoutes(familyController);
const newsRoutes = new NewsRoutes(newsController);
const pollRoutes = new PollRoutes(pollController);
const reportRoutes = new ReportRoutes(reportController);
const submissionRoutes = new SubmissionRoutes(submissionController);

router.use('/auth', authRoutes.getRoutes());
router.use('/facilities',  facilityRoutes.getRoutes());
router.use('/families', familyRoutes.getRoutes());
router.use('/news', newsRoutes.getRoutes());
router.use('/polls', pollRoutes.getRoutes());
router.use('/reports', reportRoutes.getRoutes());
router.use('/submissions', submissionRoutes.getRoutes());
router.use('/users', userRoutes.getRoutes());
router.use('/villages', villageRoutes.getRoutes());

export default router;
