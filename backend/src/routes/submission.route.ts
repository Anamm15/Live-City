import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller";
import { SubmissionService } from "../services/submission.service";
import { SubmissionRepository } from "../repositories/submission.repository";
import { FileRepository } from "../repositories/file.repository";
import prisma from "../database/prisma";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { validate } from "../middlewares/validate";
import { CreateSubmissionSchema, UpdateSubmissionSchema, UpdateSubmissionStatusSchema } from "../validators/submission.validator";

const router = Router();
const fileRepository = new FileRepository(prisma);
const submissionRepository = new SubmissionRepository(prisma);
const submissionService = new SubmissionService(submissionRepository, fileRepository);
const submissionController = new SubmissionController(submissionService);

router.get('/', authMiddleware, authorizeRoles(Role.ADMIN), submissionController.getSubmissions.bind(submissionController));
router.get('/:id', authMiddleware, submissionController.getSubmissionById.bind(submissionController));
router.get('/user/:userId', authMiddleware, submissionController.getSubmissionsByUserId.bind(submissionController));
router.post('/', authMiddleware, validate(CreateSubmissionSchema), submissionController.createSubmission.bind(submissionController));
router.patch('/:id', authMiddleware, validate(UpdateSubmissionSchema), submissionController.updateSubmission.bind(submissionController));
router.patch('/:id/status', authMiddleware, validate(UpdateSubmissionStatusSchema), authorizeRoles(Role.ADMIN), submissionController.updateSubmissionStatus.bind(submissionController));
router.delete('/:id', authMiddleware, submissionController.deleteSubmission.bind(submissionController));

export default router;