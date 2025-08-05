import { Router } from "express";
import authMiddleware from "../middlewares/authentication";
import { validate } from "../middlewares/validate";
import { CreateVillageSchema, UpdateVillageSchema } from "../validators/village.validator";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { IVillageController } from "../interfaces/controllers/IVillageController";

export class VillageRoutes {
   private router: Router;
   private villageController: IVillageController;

   constructor(villageController: IVillageController) {
      this.router = Router();
      this.villageController = villageController;
      this.configureRoutes();
   }

   private configureRoutes() {
      this.router.get('/', authMiddleware, this.villageController.getVillages.bind(this.villageController));
      this.router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), validate(CreateVillageSchema), this.villageController.createVillage.bind(this.villageController));
      this.router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateVillageSchema), this.villageController.updateVillage.bind(this.villageController));
      this.router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), this.villageController.deleteVillage.bind(this.villageController));
      return this.router;
   }

   public getRoutes() {
      return this.router;
   }
}