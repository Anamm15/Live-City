import { 
   facilityRepository, 
   familyRepository, 
   fileRepository, 
   newsRepository, 
   pollRepository, 
   reportRepository, 
   submissionRepository, 
   userRepository, 
   villageRepository } from "../repositories";
import { AuthService } from "./auth.service";
import { FacilityService } from "./facility.service";
import { FamilyService } from "./family.service";
import { NewsService } from "./news.service";
import { PollService } from "./poll.service";
import { ReportService } from "./report.service";
import { SubmissionService } from "./submission.service";
import { UserService } from "./user.service";
import { VillageService } from "./village.service";

export const authService = new AuthService(userRepository);
export const userService = new UserService(userRepository, fileRepository);
export const facilityService = new FacilityService(facilityRepository, fileRepository);
export const familyService = new FamilyService(familyRepository);
export const newsService = new NewsService(newsRepository, fileRepository);
export const pollService = new PollService(pollRepository);
export const reportService = new ReportService(reportRepository, fileRepository);
export const submissionService = new SubmissionService(submissionRepository, fileRepository);
export const villageService = new VillageService(villageRepository, fileRepository);