import { Router } from "express";
import { NewsController } from "../controllers/news.controller";
import { NewsService } from "../services/news.service";
import { NewsRepository } from "../repositories/news.repository";
import prisma from "../database/prisma";
import authMiddleware from "../middlewares/authentication";
import authorizeRoles from "../middlewares/authorization";
import { Role } from "../generated/prisma";
import { validate } from "../middlewares/validate";
import { CreateNewsCommentSchema, CreateNewsReactionSchema, CreateNewsSchema, UpdateNewsSchema } from "../validators/news.validator";

const newsRepository = new NewsRepository(prisma);
const newsService = new NewsService(newsRepository);
const newsController = new NewsController(newsService);
const router = Router();

router.get('/', authMiddleware, newsController.getNews.bind(newsController));
router.get('/:id', authMiddleware, newsController.getNewsById.bind(newsController));
router.post('/', authMiddleware, authorizeRoles(Role.ADMIN), validate(CreateNewsSchema), newsController.createNews.bind(newsController));
router.patch('/:id', authMiddleware, authorizeRoles(Role.ADMIN), validate(UpdateNewsSchema), newsController.updateNews.bind(newsController));
router.delete('/:id', authMiddleware, authorizeRoles(Role.ADMIN), newsController.deleteNews.bind(newsController));
router.get('/:id/comments', authMiddleware, newsController.getNewsComments.bind(newsController));
router.post('/:id/comments', authMiddleware, validate(CreateNewsCommentSchema), newsController.createNewsComment.bind(newsController));
router.delete('/comments/:commentId', authMiddleware, newsController.deleteNewsComment.bind(newsController));
router.get('/:id/reactions', authMiddleware, newsController.getNewsReactions.bind(newsController));
router.post('/:id/reactions', authMiddleware, validate(CreateNewsReactionSchema), newsController.createNewsReactions.bind(newsController));

export default router;