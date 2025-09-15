import { Router } from "express";
import upload from "../middlewares/upload";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "@prisma/client";
import { validate } from "../middlewares/validate";
import {
  CreateNewsCommentSchema,
  CreateNewsReactionSchema,
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validators/news.validator";
import { INewsController } from "../interfaces/controllers/INewsController";

export class NewsRoutes {
  private router: Router;
  private newsController: INewsController;

  constructor(newsController: INewsController) {
    this.router = Router();
    this.newsController = newsController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.newsController.getNews.bind(this.newsController)
    );
    this.router.get(
      "/:id",
      authMiddleware,
      this.newsController.getNewsById.bind(this.newsController)
    );
    this.router.post(
      "/",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      upload.single("file"),
      validate(CreateNewsSchema),
      this.newsController.createNews.bind(this.newsController)
    );
    this.router.patch(
      "/:id",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      validate(UpdateNewsSchema),
      this.newsController.updateNews.bind(this.newsController)
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      authorizeRoles(Role.ADMIN),
      this.newsController.deleteNews.bind(this.newsController)
    );
    this.router.get(
      "/:id/comments",
      authMiddleware,
      this.newsController.getNewsComments.bind(this.newsController)
    );
    this.router.post(
      "/:id/comments",
      authMiddleware,
      validate(CreateNewsCommentSchema),
      this.newsController.createNewsComment.bind(this.newsController)
    );
    this.router.delete(
      "/comments/:commentId",
      authMiddleware,
      this.newsController.deleteNewsComment.bind(this.newsController)
    );
    this.router.get(
      "/:id/reactions",
      authMiddleware,
      this.newsController.getNewsReactions.bind(this.newsController)
    );
    this.router.post(
      "/:id/reactions",
      authMiddleware,
      validate(CreateNewsReactionSchema),
      this.newsController.createNewsReactions.bind(this.newsController)
    );
    return this.router;
  }

  public getRoutes() {
    return this.router;
  }
}
