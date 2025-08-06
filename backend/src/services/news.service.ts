import cloudinary from "../config/cloudinary";
import fs from "fs";
import { 
   CreateNewsCommentRequest, 
   CreateNewsReactionRequest, 
   CreateNewsRequest, 
   NewsResponse, 
   NewsCommentResponse, 
   NewsReactionResponse, 
   UpdateNewsRequest, } from "../dto/news.dto";
import { CloudFolderName, LIMIT_NEWS_COMMENT_PAGE, LIMIT_NEWS_PAGE } from "../helpers/app.constants";
import { NewsMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { INewsRepository } from "../interfaces/repositories/INewsRepository";
import { INewsService } from "../interfaces/services/INewsService";
import { NotFoundError } from "../utils/errors";
import { UploadFile } from "../dto/file.dto";
import { FileableType, Prisma, PrismaClient } from "../generated/prisma";
import { generateFilename } from "../utils/formatFilename";

export class NewsService implements INewsService {
   private newsRepository: INewsRepository;
   private fileRepository: IFileRepository;
   private prisma: PrismaClient;

   constructor(
      newsRepository: INewsRepository, 
      fileRepository: IFileRepository,
      prisma: PrismaClient) {
      this.newsRepository = newsRepository;
      this.fileRepository = fileRepository;
      this.prisma = prisma;
   }

   async getNews(page: number): Promise<NewsResponse[]> {
      try {
         if (page < 1) page = 1;
         const offset = (page - 1) * LIMIT_NEWS_PAGE;
         const news = await this.newsRepository.getNews(offset, LIMIT_NEWS_PAGE);
         if (news.length === 0) {
            throw new NotFoundError(NewsMessage.NEWS_NOT_FOUND);
         }
         return news;
      } catch (error) {
         throw error;
      }       
   }

   async getNewsById(id: number): Promise<NewsResponse> {
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

   async createNews(news: CreateNewsRequest, file: Express.Multer.File): Promise<NewsResponse> {
      let cloudinaryResult: any | null = null;
      
      return await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
         try {
            const newNews = await this.newsRepository.createNews(news, tx);
            const newFilename = generateFilename(FileableType.NEWS, newNews.id);
            cloudinaryResult = await cloudinary.uploader.upload(file.path, {
               folder: CloudFolderName.NEWS,
               public_id: newFilename
            });
            
            fs.unlinkSync(file.path);
            const fileData: UploadFile = {
               urlFile: cloudinaryResult.secure_url,
               fileableId: newNews.id,
               fileableType: FileableType.NEWS
            };
            await this.fileRepository.uploadFile(fileData, tx);
            return newNews;
         } catch (error) {
            if (cloudinaryResult?.public_id) {
               await cloudinary.uploader.destroy(cloudinaryResult.public_id);
            }
            throw error;
         }
      });
   }

   async updateNews(id: number, news: UpdateNewsRequest): Promise<NewsResponse> {
      try {
         return this.newsRepository.updateNews(id, news);
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

   async getNewsComments(newsId: number, page: number): Promise<NewsCommentResponse[]> {
      try {
         const offset = (page - 1) * LIMIT_NEWS_COMMENT_PAGE;
         return this.newsRepository.getNewsComments(newsId, offset, LIMIT_NEWS_COMMENT_PAGE);
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