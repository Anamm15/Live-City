import { CreateNewsCommentRequest, CreateNewsReactionRequest, CreateNewsRequest, GetNewsResponse, NewsCommentResponse, NewsReactionResponse, UpdateNewsRequest } from "../dto/news.dto";
import { INewsRepository } from "../interfaces/repositories/INewsRepository";
import { INewsService } from "../interfaces/services/INewsService";


export class NewsService implements INewsService {
   private newsRepository: INewsRepository;

   constructor(newsRepository: INewsRepository) {
      this.newsRepository = newsRepository;
   }

   async getNews(): Promise<GetNewsResponse[]> {
      try {
         return this.newsRepository.getNews();
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }       
   }

   async getNewsById(id: number): Promise<GetNewsResponse | null> {
      try {
         return this.newsRepository.getNewsById(id);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }       
   }

   async createNews(news: CreateNewsRequest): Promise<GetNewsResponse> {
      try {
         return this.newsRepository.createNews(news);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }   
   }

   async updateNews(id: number, news: UpdateNewsRequest): Promise<GetNewsResponse> {
      try {
         const data: UpdateNewsRequest = {
            ...news,
            id
         }
         return this.newsRepository.updateNews(data);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }   
   }

   async deleteNews(newsId: number): Promise<void> {
      try {
         return this.newsRepository.deleteNews(newsId);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }   
   }

   async getNewsComments(newsId: number): Promise<NewsCommentResponse[]> {
      try {
         return this.newsRepository.getNewsComments(newsId);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
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
      } catch (error: any) {
         throw new Error(error.message);
      }
   }

   async deleteNewsComment(id: number): Promise<void> {
      try {
         return this.newsRepository.deleteNewsComment(id);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }   
   }

   async getNewsReactions(newsId: number): Promise<NewsReactionResponse[]> {
      try {
         return this.newsRepository.getNewsReactions(newsId);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }       
   }

   async createNewsReactions(data: CreateNewsReactionRequest): Promise<NewsReactionResponse> {
      try {
         return this.newsRepository.reactToNews(data);
      } catch (error: any) {
         throw new Error("Error fetching news: " + error.message);
      }   
   }
}