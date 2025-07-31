import { Router } from "express";
import prisma from "../database/prisma";
import { FacilityRepository } from "../repositories/facility.repository";
import { FacilityService } from "../services/facility.service";
import { FacilityController } from "../controllers/facility.controller";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { validate } from "../middlewares/validate";
import { CreateFacilitySchema, UpdateFacilitySchema } from "../validators/facility.validator";

const router = Router();
const facilityRepository = new FacilityRepository(prisma);
const facilityService = new FacilityService(facilityRepository);
const facilityController = new FacilityController(facilityService);

router.get('/', authMiddleware, facilityController.getFacilities.bind(facilityController));
router.get('/:id', authMiddleware, facilityController.getFacilityById.bind(facilityController));
router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), validate(CreateFacilitySchema), facilityController.createFacility.bind(facilityController));
router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateFacilitySchema), facilityController.updateFacility.bind(facilityController));
router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), facilityController.deleteFacility.bind(facilityController));

export default router;