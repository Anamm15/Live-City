import { Request, Response, NextFunction } from "express";
import { INewsController } from "../interfaces/controllers/INewsController";
import { INewsService } from "../interfaces/services/INewsService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { CreateNewsInput } from "../validators/news.validator";
import { NewsMessage } from "../helpers/message.constants";
import { error } from "console";

export class NewsController implements INewsController {
   private newsService: INewsService

   constructor(newsService: INewsService) {
      this.newsService = newsService;
   }

   async getNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.newsService.getNews();
         res.status(200).send(buildResponseSuccess(results, NewsMessage.NEWS_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_RETRIEVE_FAILED));
      }    
   }

   async getNewsById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }
         const result = await this.newsService.getNewsById(newsId);
         res.status(200).send(buildResponseSuccess(result, NewsMessage.NEWS_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_RETRIEVE_FAILED));
      }       
   }

   async createNews(req: Request<{}, {}, CreateNewsInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.newsService.createNews(req.body);
         res.status(201).send(buildResponseSuccess(result, NewsMessage.NEWS_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_CREATE_FAILED));
      }   
   }

   async updateNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }
         const result = await this.newsService.updateNews(newsId, req.body);
         res.status(200).send(buildResponseSuccess(result, NewsMessage.NEWS_UPDATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_UPDATE_FAILED));
      }   
   }

   async deleteNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         await this.newsService.deleteNews(parseInt(req.params.id, 10));
         res.status(204).send(buildResponseSuccess(null, NewsMessage.NEWS_DELETED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_DELETE_FAILED));
      }   
   }

   async getNewsComments(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }
         const results = await this.newsService.getNewsComments(newsId);
         res.status(200).send(buildResponseSuccess(results, NewsMessage.NEWS_COMMENT_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_COMMENT_RETRIEVE_FAILED));
      }   
   }

   async createNewsComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }

         let userId: number;
         if (!req.user) {
            throw error("User not found");
         }
         userId = parseInt(req.user.id, 10);
         const result = await this.newsService.createNewsComment(newsId, userId, req.body);
         res.status(201).send(buildResponseSuccess(result, NewsMessage.NEWS_COMMENT_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_COMMENT_CREATE_FAILED));
      }   
   }

   async deleteNewsComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const commentId = parseInt(req.params.commentId, 10);
         if (isNaN(commentId)) {
            throw new Error("Invalid comment id");
         }
         await this.newsService.deleteNewsComment(commentId);
         res.status(204).send(buildResponseSuccess(null, NewsMessage.NEWS_COMMENT_DELETED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_COMMENT_DELETE_FAILED));
      }   
   }

   async getNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }
         const results = await this.newsService.getNewsReactions(newsId);
         res.status(200).send(buildResponseSuccess(results, NewsMessage.NEWS_REACTION_RETRIEVED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_REACTION_RETRIEVE_FAILED));
      }   
   }

   async createNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new Error("Invalid news id");
         }
         
         let userId: number;
         if (!req.user) {
            throw error("User not found");
         }

         userId = parseInt(req.user.id, 10);
         const result = await this.newsService.createNewsReactions({ newsId, userId });
         res.status(201).send(buildResponseSuccess(result, NewsMessage.NEWS_REACTION_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, NewsMessage.NEWS_REACTION_CREATE_FAILED));
      }   
   }
}