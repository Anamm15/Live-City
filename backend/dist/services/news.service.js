"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const app_constants_1 = require("../helpers/app.constants");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const client_1 = require("@prisma/client");
const format_1 = require("../utils/format");
const uuid_1 = require("../utils/uuid");
class NewsService {
    constructor(newsRepository, fileRepository, prisma) {
        this.newsRepository = newsRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getNews(page) {
        try {
            if (page < 1)
                page = 1;
            const offset = (page - 1) * app_constants_1.LIMIT_NEWS_PAGE;
            const news = await this.newsRepository.getNews(offset, app_constants_1.LIMIT_NEWS_PAGE);
            if (news.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.NewsMessage.NEWS_NOT_FOUND);
            }
            return news;
        }
        catch (error) {
            throw error;
        }
    }
    async getNewsById(id) {
        try {
            const news = await this.newsRepository.getNewsById(id);
            if (!news) {
                throw new errors_1.NotFoundError(message_constants_1.NewsMessage.NEWS_NOT_FOUND);
            }
            return news;
        }
        catch (error) {
            throw error;
        }
    }
    async createNews(news, file) {
        let cloudinaryResult = null;
        return await this.prisma.$transaction(async (tx) => {
            try {
                const uuid = (0, uuid_1.generateUUIDWithPrefix)(app_constants_1.PrefixType.NEWS);
                news.shortId = uuid;
                const newNews = await this.newsRepository.createNews(news, tx);
                if (file) {
                    const newFilename = (0, format_1.generateFilename)(client_1.FileableType.NEWS, newNews.id);
                    cloudinaryResult = await cloudinary_1.default.uploader.upload(file.path, {
                        folder: app_constants_1.CloudFolderName.NEWS,
                        public_id: newFilename,
                    });
                    fs_1.default.unlinkSync(file.path);
                    const fileData = {
                        urlFile: cloudinaryResult.secure_url,
                        fileableId: newNews.id,
                        fileableType: client_1.FileableType.NEWS,
                    };
                    await this.fileRepository.uploadFile(fileData, tx);
                }
                return newNews;
            }
            catch (error) {
                if (cloudinaryResult?.public_id) {
                    await cloudinary_1.default.uploader.destroy(cloudinaryResult.public_id);
                }
                throw error;
            }
        });
    }
    async updateNews(id, news) {
        try {
            return this.newsRepository.updateNews(id, news);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteNews(newsId) {
        try {
            return this.newsRepository.deleteNews(newsId);
        }
        catch (error) {
            throw error;
        }
    }
    async getNewsComments(newsId, page) {
        try {
            const offset = (page - 1) * app_constants_1.LIMIT_NEWS_COMMENT_PAGE;
            return this.newsRepository.getNewsComments(newsId, offset, app_constants_1.LIMIT_NEWS_COMMENT_PAGE);
        }
        catch (error) {
            throw error;
        }
    }
    async createNewsComment(newsId, userId, comment) {
        try {
            const data = {
                ...comment,
                newsId,
                userId,
            };
            return this.newsRepository.createNewsComment(data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteNewsComment(id, userId) {
        try {
            return this.newsRepository.deleteNewsComment(id, userId);
        }
        catch (error) {
            throw error;
        }
    }
    async getNewsReactions(newsId) {
        try {
            return this.newsRepository.getNewsReactions(newsId);
        }
        catch (error) {
            throw error;
        }
    }
    async createNewsReactions(newsId, userId) {
        try {
            let data = {
                newsId,
                userId,
            };
            return this.newsRepository.reactToNews(data);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.NewsService = NewsService;
