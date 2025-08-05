import { 
   CreateNewsCommentRequest, 
   CreateNewsReactionRequest, 
   CreateNewsRequest, 
   NewsResponse, 
   NewsCommentResponse, 
   NewsReactionResponse, 
   UpdateNewsRequest } from "../dto/news.dto";
import { Prisma, PrismaClient } from "../generated/prisma";
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

const selectedNewsWithDetailField = {
   id: true,
   title: true,
   date: true,
   content: true,
   reactionCount: true,
   commentCount: true,
   comments: {
      select: selectedNewsCommentField
   }
}

export class NewsRepository implements INewsRepository {
   private prisma: PrismaClient;

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getNews(offset: number, limit: number): Promise<NewsResponse[]> {
      try {
         const news = await this.prisma.news.findMany({
            select: selectedNewsField,
            skip: offset,
            take: limit,
            orderBy: { id: "desc" }
         });
         return news;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getNewsById(id: number): Promise<NewsResponse | null> {
      try {
         const news = await this.prisma.news.findUnique({
            where: { id },
            select: selectedNewsWithDetailField
         });
         return news;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async createNews(data: CreateNewsRequest, tx: Prisma.TransactionClient): Promise<NewsResponse> {
      try {
         const newNews = await tx.news.create({
            data,
            select: selectedNewsField,
         });
         return newNews;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateNews(id: number, data: UpdateNewsRequest): Promise<NewsResponse> {
      try {
         const updatedNews = await this.prisma.news.update({
            where: { id },
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

   async getNewsComments(newsId: number, offset: number, limit: number): Promise<NewsCommentResponse[]> {
      try {
         const comments = await this.prisma.newsComments.findMany({
            where: { newsId },
            select: selectedNewsCommentField,
            skip: offset,
            take: limit
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