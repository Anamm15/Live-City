import { CreateNewsCommentRequest, CreateNewsReactionRequest, CreateNewsRequest, GetNewsResponse, NewsCommentResponse, NewsReactionResponse, UpdateNewsRequest } from "../dto/news.dto";
import { PrismaClient } from "../generated/prisma";
import { INewsRepository } from "../interfaces/repositories/INewsRepository";
import { AppError } from "../utils/errors";

const selectedNewsField = {
   id: true,
   title: true,
   date: true,
   content: true,
   reactionCount: true,
   commentCount: true
}

const selectedNewsCommentField = {
   id: true,
   content: true,
   createdAt: true,
   user: {
      select: {
         id: true,
         name: true,
      }
   }
}

const selectedNewsReactionField = {
   id: true,
   createdAt: true,
   user: {
      select: {
         id: true,
         name: true
      }
   }
}

export class NewsRepository implements INewsRepository {
   private prisma: PrismaClient;

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getNews(): Promise<GetNewsResponse[]> {
      try {
         const news = await this.prisma.news.findMany({
            select: selectedNewsField
         });
         return news;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getNewsById(id: number): Promise<GetNewsResponse | null> {
      try {
         const news = await this.prisma.news.findUnique({
            where: { id },
            select: selectedNewsField
         });
         return news;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async createNews(data: CreateNewsRequest): Promise<GetNewsResponse> {
      try {
         const newNews = await this.prisma.news.create({
            data,
         });
         return newNews;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateNews(data: UpdateNewsRequest): Promise<GetNewsResponse> {
      try {
         const updatedNews = await this.prisma.news.update({
            where: { id: data.id },
            data: data,
            select: selectedNewsField
         });
         return updatedNews;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async deleteNews(id: number): Promise<void> {
      try {
         await this.prisma.news.delete({
            where: { id }
         })
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getNewsComments(newsId: number): Promise<NewsCommentResponse[]> {
      try {
         const comments = await this.prisma.newsComments.findMany({
            where: { newsId },
            select: selectedNewsCommentField
         })
         return comments;
      } catch (error: any) {
         throw new AppError(error.message);
      }   
   }

   async createNewsComment(data: CreateNewsCommentRequest): Promise<NewsCommentResponse> {
      try {
         const newNewsComment = await this.prisma.newsComments.create({
            data,
            select: selectedNewsCommentField
         });
         return newNewsComment;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async deleteNewsComment(id: number): Promise<void> {
      try {
         await this.prisma.newsComments.delete({
            where: { id }
         })
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getNewsReactions(newsId: number): Promise<NewsReactionResponse[]> {         
      try {
         const reactions = await this.prisma.newsReactions.findMany({
            where: { newsId },
            select: selectedNewsReactionField
         })
         return reactions;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async reactToNews(data: CreateNewsReactionRequest): Promise<NewsReactionResponse> {
      try {
         const newReaction = await this.prisma.newsReactions.create({
            data,
            select: selectedNewsReactionField
         });
         return newReaction;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }
}