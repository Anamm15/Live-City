import { Router } from "express";
import prisma from "../database/prisma";
import { FamilyRepository } from "../repositories/family.repository";
import { FamilyService } from "../services/family.service";
import { FamilyController } from "../controllers/family.controller";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { validate } from "../middlewares/validate";
import { CreateFamilySchema, UpdateFamilySchema } from "../validators/family.validator";

const router = Router();
const familyRepository = new FamilyRepository(prisma);
const familyService = new FamilyService(familyRepository);
const familyController = new FamilyController(familyService);

router.get('/', authMiddleware, familyController.getFamilies.bind(familyController));
router.get('/:id', authMiddleware, familyController.getFamilyWithMembers.bind(familyController));
router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), validate(CreateFamilySchema), familyController.createFamily.bind(familyController));
router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateFamilySchema), familyController.updateFamily.bind(familyController));
router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), familyController.deleteFamily.bind(familyController));

export default router;