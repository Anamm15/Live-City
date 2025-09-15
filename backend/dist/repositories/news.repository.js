"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const errors_1 = require("../utils/errors");
const selectedNewsField = {
    id: true,
    shortId: true,
    title: true,
    date: true,
    content: true,
    reactionCount: true,
    commentCount: true,
};
const selectedNewsCommentField = {
    id: true,
    content: true,
    createdAt: true,
    user: {
        select: {
            id: true,
            name: true,
        },
    },
};
const selectedNewsReactionField = {
    id: true,
    createdAt: true,
    user: {
        select: {
            id: true,
            name: true,
        },
    },
};
const selectedNewsWithDetailField = {
    id: true,
    shortId: true,
    title: true,
    date: true,
    content: true,
    reactionCount: true,
    commentCount: true,
    comments: {
        select: selectedNewsCommentField,
    },
};
class NewsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getNews(offset, limit) {
        try {
            const news = await this.prisma.news.findMany({
                select: selectedNewsField,
                skip: offset,
                take: limit,
                orderBy: { id: "desc" },
            });
            return news;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getNewsById(id) {
        try {
            const news = await this.prisma.news.findUnique({
                where: { id },
                select: selectedNewsWithDetailField,
            });
            return news;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createNews(data, tx) {
        try {
            if (!data.shortId) {
                throw new errors_1.AppError("shortId is required");
            }
            const newNews = await tx.news.create({
                data: {
                    ...data,
                    shortId: data.shortId,
                },
                select: selectedNewsField,
            });
            return newNews;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateNews(id, data) {
        try {
            const updatedNews = await this.prisma.news.update({
                where: { id },
                data: data,
                select: selectedNewsField,
            });
            return updatedNews;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteNews(id) {
        try {
            await this.prisma.news.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getNewsComments(newsId, offset, limit) {
        try {
            const comments = await this.prisma.newsComments.findMany({
                where: { newsId },
                select: selectedNewsCommentField,
                skip: offset,
                take: limit,
            });
            return comments;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createNewsComment(data) {
        return await this.prisma.$transaction(async (tx) => {
            try {
                const newNewsComment = await tx.newsComments.create({
                    data,
                    select: selectedNewsCommentField,
                });
                await tx.news.update({
                    where: { id: data.newsId },
                    data: { commentCount: { increment: 1 } },
                });
                return newNewsComment;
            }
            catch (error) {
                throw new errors_1.AppError(error.message);
            }
        });
    }
    async deleteNewsComment(id, userId) {
        try {
            await this.prisma.newsComments.delete({
                where: {
                    id,
                    userId,
                },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getNewsReactions(newsId) {
        try {
            const reactions = await this.prisma.newsReactions.findMany({
                where: { newsId },
                select: selectedNewsReactionField,
            });
            return reactions;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async reactToNews(data) {
        try {
            const newReaction = await this.prisma.newsReactions.create({
                data,
                select: selectedNewsReactionField,
            });
            return newReaction;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.NewsRepository = NewsRepository;
