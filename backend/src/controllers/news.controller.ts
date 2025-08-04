import { Request, Response, NextFunction } from "express";
import { INewsController } from "../interfaces/controllers/INewsController";
import { INewsService } from "../interfaces/services/INewsService";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { CreateNewsInput } from "../validators/news.validator";
import { CommonMessage, NewsMessage, UserMessage } from "../helpers/message.constants";
import { error } from "console";
import { StatusCode } from "../helpers/status_code.constant";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class NewsController implements INewsController {
   private newsService: INewsService

   constructor(newsService: INewsService) {
      this.newsService = newsService;
   }

   async getNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.newsService.getNews();
         res.status(StatusCode.OK).send(buildResponseSuccess(results, NewsMessage.NEWS_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }    
   }

   async getNewsById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const result = await this.newsService.getNewsById(newsId);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, NewsMessage.NEWS_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }       
   }

   async createNews(req: Request<{}, {}, CreateNewsInput>, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.newsService.createNews(req.body);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(result, NewsMessage.NEWS_CREATED));
      } catch (error: any) {
         res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, NewsMessage.NEWS_CREATE_FAILED));
      }   
   }

   async updateNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new NotFoundError(NewsMessage.NEWS_NOT_FOUND);
         }
         const result = await this.newsService.updateNews(newsId, req.body);
         res.status(StatusCode.OK).send(buildResponseSuccess(result, NewsMessage.NEWS_UPDATED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, NewsMessage.NEWS_UPDATE_FAILED));
         }
      }   
   }

   async deleteNews(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new NotFoundError(NewsMessage.NEWS_NOT_FOUND);
         }
         await this.newsService.deleteNews(newsId);
         res.status(StatusCode.NO_CONTENT).send();
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, NewsMessage.NEWS_DELETE_FAILED));
         }
      }   
   }

   async getNewsComments(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.newsService.getNewsComments(newsId);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, NewsMessage.NEWS_COMMENT_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async createNewsComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }

         let userId: number;
         if (!req.user) {
            throw new BadRequestError(UserMessage.USER_NOT_FOUND);
         }
         userId = parseInt(req.user.id, 10);
         const result = await this.newsService.createNewsComment(newsId, userId, req.body);
         res.status(StatusCode.CREATED).send(buildResponseSuccess(result, NewsMessage.NEWS_COMMENT_CREATED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async deleteNewsComment(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const commentId = parseInt(req.params.commentId, 10);
         if (isNaN(commentId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         await this.newsService.deleteNewsComment(commentId);
         res.status(StatusCode.OK).send();
      } catch (error: any) {
         if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async getNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         const results = await this.newsService.getNewsReactions(newsId);
         res.status(StatusCode.OK).send(buildResponseSuccess(results, NewsMessage.NEWS_REACTION_RETRIEVED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }   
   }

   async createNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const newsId = parseInt(req.params.id, 10);
         if (isNaN(newsId)) {
            throw new BadRequestError(CommonMessage.INVALID_PARAMS);
         }
         
         let userId: number;
         if (!req.user) {
            throw error("User not found");
         }

         userId = parseInt(req.user.id, 10);
         const result = await this.newsService.createNewsReactions({ newsId, userId });
         res.status(StatusCode.CREATED).send(buildResponseSuccess(result, NewsMessage.NEWS_REACTION_CREATED));
      } catch (error: any) {
         if (error instanceof NotFoundError) {
            res.status(StatusCode.NOT_FOUND).send(buildResponseError(error.message, NewsMessage.NEWS_NOT_FOUND));
         } else if (error instanceof BadRequestError) {
            res.status(StatusCode.BAD_REQUEST).send(buildResponseError(error.message, CommonMessage.INVALID_PARAMS));
         } else {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send(buildResponseError(error.message, CommonMessage.SERVER_ERROR));
         }
      }
   }
}