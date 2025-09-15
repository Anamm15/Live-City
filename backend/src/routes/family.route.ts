import { Router } from "express";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { validate } from "../middlewares/validate";
import {
  CreateFamilySchema,
  UpdateFamilySchema,
} from "../validators/family.validator";
import { IFamilyController } from "../interfaces/controllers/IFamilyController";

export class FamilyRoutes {
  private router: Router;
  private familyController: IFamilyController;

  constructor(familyController: IFamilyController) {
    this.router = Router();
    this.familyController = familyController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.familyController.getFamilies.bind(this.familyController)
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.familyController.getFamilyWithMembers.bind(this.familyController)
    );
    this.router.post(
      "/",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      validate(CreateFamilySchema),
      this.familyController.createFamily.bind(this.familyController)
    );
    this.router.patch(
      "/:id",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      validate(UpdateFamilySchema),
      this.familyController.updateFamily.bind(this.familyController)
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      this.familyController.deleteFamily.bind(this.familyController)
    );
    return this.router;
  }

  public getRoutes() {
    return this.router;
  }
}
