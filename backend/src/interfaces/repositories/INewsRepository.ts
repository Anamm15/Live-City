import { 
   CreateNewsCommentRequest, 
   CreateNewsReactionRequest, 
   CreateNewsRequest, 
   NewsResponse, 
   NewsCommentResponse, 
   NewsReactionResponse, 
   UpdateNewsRequest } from "../../dto/news.dto";

export interface INewsRepository {
   getNews(offset: number, limit: number): Promise<NewsResponse[]>;
   getNewsById(id: number): Promise<NewsResponse | null>;
   createNews(data: CreateNewsRequest): Promise<NewsResponse>;
   updateNews(id: number, data: UpdateNewsRequest): Promise<NewsResponse>;
   deleteNews(id: number): Promise<void>;
   getNewsComments(newsId: number, offset: number, limit: number): Promise<NewsCommentResponse[]>;
   createNewsComment(data: CreateNewsCommentRequest): Promise<NewsCommentResponse>;
   deleteNewsComment(id: number): Promise<void>;
   getNewsReactions(newsId: number): Promise<NewsReactionResponse[]>;
   reactToNews(data: CreateNewsReactionRequest): Promise<NewsReactionResponse>;
}