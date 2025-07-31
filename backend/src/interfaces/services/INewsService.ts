import { CreateNewsCommentRequest, CreateNewsReactionRequest, CreateNewsRequest, GetNewsResponse, NewsCommentResponse, NewsReactionResponse, UpdateNewsRequest } from "../../dto/news.dto";

export interface INewsService {
   getNews(): Promise<GetNewsResponse[]>;
   getNewsById(id: number): Promise<GetNewsResponse | null>;
   createNews(news: CreateNewsRequest): Promise<GetNewsResponse>;
   updateNews(id: number, news: UpdateNewsRequest): Promise<GetNewsResponse>;
   deleteNews(newsId: number): Promise<void>;
   getNewsComments(newsId: number): Promise<NewsCommentResponse[]>;
   createNewsComment(newsId: number, userId: number, comment: CreateNewsCommentRequest): Promise<NewsCommentResponse>;
   deleteNewsComment(id: number): Promise<void>;
   getNewsReactions(newsId: number): Promise<NewsReactionResponse[]>;
   createNewsReactions(data: CreateNewsReactionRequest): Promise<NewsReactionResponse>;
}