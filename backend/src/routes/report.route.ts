import { Router } from "express";
import { ReportController } from "../controllers/report.controller";
import { PrismaClient, Role } from "../generated/prisma";
import { ReportRepository } from "../repositories/report.repository";
import { ReportService } from "../services/report.service";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { validate } from "../middlewares/validate";
import { CreateReportSchema, UpdateReportSchema, UpdateResponseReportSchema } from "../validators/report.validator";

const prisma = new PrismaClient();
const reportRepositry = new ReportRepository(prisma);
const reportService = new ReportService(reportRepositry);
const reportController = new ReportController(reportService);  

const router = Router();

router.get('/', authMiddleware, authorizeRoles(Role.ADMIN), reportController.getReports.bind(reportController));
router.get('/:id', authMiddleware, reportController.getReportById.bind(reportController));
router.get('/user/:userId', authMiddleware, reportController.getReportsByUserId.bind(reportController));
router.post('/', authMiddleware, validate(CreateReportSchema), reportController.createReport.bind(reportController));
router.patch('/:id', authMiddleware, validate(UpdateReportSchema), reportController.updateReport.bind(reportController));
router.patch('/:id/response', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateResponseReportSchema), reportController.updateResponseReport.bind(reportController));
router.delete('/:id', authMiddleware, reportController.deleteReport.bind(reportController));

export default router;