import { Router } from "express";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { validate } from "../middlewares/validate";
import { CreateFacilitySchema, UpdateFacilitySchema } from "../validators/facility.validator";
import { IFacilityController } from "../interfaces/controllers/IFacilityController";
import upload from "../middlewares/upload";

export class FacilityRoutes {
   private router: Router;
   private facilityController: IFacilityController;

   constructor(facilityController: IFacilityController) {
      this.router = Router();
      this.facilityController = facilityController;
      this.configureRoutes();
   }

   private configureRoutes() {
      this.router.get('/', authMiddleware, this.facilityController.getFacilities.bind(this.facilityController));
      this.router.get('/:id', authMiddleware, this.facilityController.getFacilityById.bind(this.facilityController));
      this.router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), upload.single('file'), validate(CreateFacilitySchema), this.facilityController.createFacility.bind(this.facilityController));
      this.router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateFacilitySchema), this.facilityController.updateFacility.bind(this.facilityController));
      this.router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), this.facilityController.deleteFacility.bind(this.facilityController));
      return this.router;
   }

   public getRoutes() {
      return this.router;
   }
}