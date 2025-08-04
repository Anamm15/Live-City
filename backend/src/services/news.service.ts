import { CreateNewsCommentRequest, CreateNewsReactionRequest, CreateNewsRequest, GetNewsResponse, NewsCommentResponse, NewsReactionResponse, UpdateNewsRequest } from "../dto/news.dto";
import { NewsMessage } from "../helpers/message.constants";
import { INewsRepository } from "../interfaces/repositories/INewsRepository";
import { INewsService } from "../interfaces/services/INewsService";
import { NotFoundError } from "../utils/errors";


export class NewsService implements INewsService {
   private newsRepository: INewsRepository;

   constructor(newsRepository: INewsRepository) {
      this.newsRepository = newsRepository;
   }

   async getNews(): Promise<GetNewsResponse[]> {
      try {
         const news = await this.newsRepository.getNews();
         if (news.length === 0) {
            throw new NotFoundError(NewsMessage.NEWS_NOT_FOUND);
         }
         return news;
      } catch (error) {
         throw error;
      }       
   }

   async getNewsById(id: number): Promise<GetNewsResponse> {
      try {
         const news = await this.newsRepository.getNewsById(id);
         if (!news) {
            throw new NotFoundError(NewsMessage.NEWS_NOT_FOUND);
         }
         return news;
      } catch (error) {
         throw error;
      }       
   }

   async createNews(news: CreateNewsRequest): Promise<GetNewsResponse> {
      try {
         return this.newsRepository.createNews(news);
      } catch (error) {
         throw error;
      }   
   }

   async updateNews(id: number, news: UpdateNewsRequest): Promise<GetNewsResponse> {
      try {
         const data: UpdateNewsRequest = {
            ...news,
            id
         }
         return this.newsRepository.updateNews(data);
      } catch (error) {
         throw error;
      }   
   }

   async deleteNews(newsId: number): Promise<void> {
      try {
         return this.newsRepository.deleteNews(newsId);
      } catch (error) {
         throw error;
      }   
   }

   async getNewsComments(newsId: number): Promise<NewsCommentResponse[]> {
      try {
         return this.newsRepository.getNewsComments(newsId);
      } catch (error) {
         throw error;
      }       
   }

   async createNewsComment(newsId: number, userId: number, comment: CreateNewsCommentRequest): Promise<NewsCommentResponse> {
      try {
         const data: CreateNewsCommentRequest = {
            ...comment,
            newsId,
            userId
         }
         return this.newsRepository.createNewsComment(data);
      } catch (error) {
         throw error;
      }
   }

   async deleteNewsComment(id: number): Promise<void> {
      try {
         return this.newsRepository.deleteNewsComment(id);
      } catch (error) {
         throw error;
      }   
   }

   async getNewsReactions(newsId: number): Promise<NewsReactionResponse[]> {
      try {
         return this.newsRepository.getNewsReactions(newsId);
      } catch (error) {
         throw error;
      }       
   }

   async createNewsReactions(data: CreateNewsReactionRequest): Promise<NewsReactionResponse> {
      try {
         return this.newsRepository.reactToNews(data);
      } catch (error) {
         throw error;
      }   
   }
}