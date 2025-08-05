import { 
   authService, 
   facilityService, 
   familyService, 
   newsService, 
   pollService, 
   reportService, 
   submissionService, 
   userService, 
   villageService } from "../services";
import { AuthController } from "./auth.controller";
import { FacilityController } from "./facility.controller";
import { FamilyController } from "./family.controller";
import { NewsController } from "./news.controller";
import { PollController } from "./poll.controller";
import { ReportController } from "./report.controller";
import { SubmissionController } from "./submission.controller";
import { UserController } from "./user.controller";
import { VillageController } from "./village.controller";

export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const villageController = new VillageController(villageService);
export const facilityController = new FacilityController(facilityService);
export const familyController = new FamilyController(familyService);
export const newsController = new NewsController(newsService);
export const pollController = new PollController(pollService);
export const reportController = new ReportController(reportService);
export const submissionController = new SubmissionController(submissionService);