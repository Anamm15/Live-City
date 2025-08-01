import { Router } from "express";
import { VillageRepository } from "../repositories/village.repository";
import { VillageService } from "../services/village.service";
import { VillageController } from "../controllers/village.controller";
import prisma from "../database/prisma";
import authMiddleware from "../middlewares/authentication";
import { validate } from "../middlewares/validate";
import { CreateVillageSchema, UpdateVillageSchema } from "../validators/village.validator";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";

const router = Router();
const villageRepository = new VillageRepository(prisma);
const villageService = new VillageService(villageRepository);
const villageController = new VillageController(villageService);

router.get('/', authMiddleware, villageController.getVillages.bind(villageController));
router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), validate(CreateVillageSchema), villageController.createVillage.bind(villageController));
router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateVillageSchema), villageController.updateVillage.bind(villageController));
router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), villageController.deleteVillage.bind(villageController));

export default router;