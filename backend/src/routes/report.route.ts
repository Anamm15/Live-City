import { Router } from "express";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { validate } from "../middlewares/validate";
import {
  CreateReportSchema,
  UpdateReportSchema,
  UpdateResponseReportSchema,
} from "../validators/report.validator";
import { IReportController } from "../interfaces/controllers/IReportController";
import { Role } from "@prisma/client";
import upload from "../middlewares/upload";

export class ReportRoutes {
  private router: Router;
  private reportController: IReportController;

  constructor(reportController: IReportController) {
    this.router = Router();
    this.reportController = reportController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      this.reportController.getReports.bind(this.reportController)
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.reportController.getReportById.bind(this.reportController)
    );
    this.router.get(
      "/user",
      authMiddleware,
      this.reportController.getReportsByUserId.bind(this.reportController)
    );
    this.router.post(
      "/",
      authMiddleware,
      upload.single("file"),
      validate(CreateReportSchema),
      this.reportController.createReport.bind(this.reportController)
    );
    this.router.patch(
      "/:id",
      authMiddleware,
      validate(UpdateReportSchema),
      this.reportController.updateReport.bind(this.reportController)
    );
    this.router.patch(
      "/:id/response",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      validate(UpdateResponseReportSchema),
      this.reportController.updateResponseReport.bind(this.reportController)
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      this.reportController.deleteReport.bind(this.reportController)
    );
    return this.router;
  }

  public getRoutes() {
    return this.router;
  }
}
