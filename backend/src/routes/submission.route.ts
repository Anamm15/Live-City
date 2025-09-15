import { Router } from "express";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { validate } from "../middlewares/validate";
import {
  CreateSubmissionSchema,
  UpdateSubmissionSchema,
  UpdateSubmissionStatusSchema,
} from "../validators/submission.validator";
import { ISubmissionController } from "../interfaces/controllers/ISubmissionController";
import upload from "../middlewares/upload";

export class SubmissionRoutes {
  private router: Router;
  private submissionController: ISubmissionController;

  constructor(submissionController: ISubmissionController) {
    this.router = Router();
    this.submissionController = submissionController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      this.submissionController.getSubmissions.bind(this.submissionController)
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.submissionController.getSubmissionById.bind(
        this.submissionController
      )
    );
    this.router.get(
      "/user/:userId",
      authMiddleware,
      this.submissionController.getSubmissionsByUserId.bind(
        this.submissionController
      )
    );
    this.router.post(
      "/",
      authMiddleware,
      upload.single("file"),
      validate(CreateSubmissionSchema),
      this.submissionController.createSubmission.bind(this.submissionController)
    );
    this.router.patch(
      "/:id",
      authMiddleware,
      validate(UpdateSubmissionSchema),
      this.submissionController.updateSubmission.bind(this.submissionController)
    );
    this.router.patch(
      "/:id/status",
      authMiddleware,
      validate(UpdateSubmissionStatusSchema),
      authorizeRoles(Role.ADMIN),
      this.submissionController.updateSubmissionStatus.bind(
        this.submissionController
      )
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      this.submissionController.deleteSubmission.bind(this.submissionController)
    );
    return this.router;
  }

  public getRoutes() {
    return this.router;
  }
}
