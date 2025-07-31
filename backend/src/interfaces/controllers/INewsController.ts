import { Request, Response, NextFunction } from 'express';
import { CreateNewsInput } from '../../validators/news.validator';

export interface INewsController {
   getNews(req: Request, res: Response, next: NextFunction): Promise<void>;
   getNewsById(req: Request, res: Response, next: NextFunction): Promise<void>;
   createNews(req: Request<{}, {}, CreateNewsInput>, res: Response, next: NextFunction): Promise<void>;
   updateNews(req: Request, res: Response, next: NextFunction): Promise<void>;
   deleteNews(req: Request, res: Response, next: NextFunction): Promise<void>;
   getNewsComments(req: Request, res: Response, next: NextFunction): Promise<void>;
   createNewsComment(req: Request, res: Response, next: NextFunction): Promise<void>;
   deleteNewsComment(req: Request, res: Response, next: NextFunction): Promise<void>;
   getNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void>;
   createNewsReactions(req: Request, res: Response, next: NextFunction): Promise<void>;
}