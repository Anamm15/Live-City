import { 
   CreateNewsCommentRequest, 
   CreateNewsReactionRequest, 
   CreateNewsRequest, 
   NewsResponse, 
   NewsCommentResponse, 
   NewsReactionResponse, 
   UpdateNewsRequest, } from "../../dto/news.dto";

export interface INewsService {
   getNews(page: number): Promise<NewsResponse[]>;
   getNewsById(id: number): Promise<NewsResponse>;
   createNews(news: CreateNewsRequest, file: Express.Multer.File): Promise<NewsResponse>;
   updateNews(id: number, news: UpdateNewsRequest): Promise<NewsResponse>;
   deleteNews(newsId: number): Promise<void>;
   getNewsComments(newsId: number, page: number): Promise<NewsCommentResponse[]>;
   createNewsComment(newsId: number, userId: number, comment: CreateNewsCommentRequest): Promise<NewsCommentResponse>;
   deleteNewsComment(id: number, userId: number): Promise<void>;
   getNewsReactions(newsId: number): Promise<NewsReactionResponse[]>;
   createNewsReactions(newsId: number, userId: number): Promise<NewsReactionResponse>;
}