"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const console_1 = require("console");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getNews(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            const results = await this.newsService.getNews(page);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.NewsMessage.NEWS_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getNewsById(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.newsService.getNewsById(newsId);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.NewsMessage.NEWS_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createNews(req, res, next) {
        try {
            const result = await this.newsService.createNews(req.body, req.file);
            res
                .status(status_code_constant_1.StatusCode.CREATED)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.NewsMessage.NEWS_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.FILE_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_CREATE_FAILED));
            }
        }
    }
    async updateNews(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.NotFoundError(message_constants_1.NewsMessage.NEWS_NOT_FOUND);
            }
            const result = await this.newsService.updateNews(newsId, req.body);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.NewsMessage.NEWS_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_UPDATE_FAILED));
            }
        }
    }
    async deleteNews(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.NotFoundError(message_constants_1.NewsMessage.NEWS_NOT_FOUND);
            }
            await this.newsService.deleteNews(newsId);
            res.status(status_code_constant_1.StatusCode.NO_CONTENT).send();
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_DELETE_FAILED));
            }
        }
    }
    async getNewsComments(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            let page = parseInt(req.query.page, 10);
            if (isNaN(newsId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (isNaN(page) || page < 1) {
                page = 1;
            }
            const results = await this.newsService.getNewsComments(newsId, page);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.NewsMessage.NEWS_COMMENT_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createNewsComment(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const result = await this.newsService.createNewsComment(newsId, req.user.id, req.body);
            res
                .status(status_code_constant_1.StatusCode.CREATED)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.NewsMessage.NEWS_COMMENT_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async deleteNewsComment(req, res, next) {
        try {
            const commentId = parseInt(req.params.commentId, 10);
            if (isNaN(commentId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            await this.newsService.deleteNewsComment(commentId, req.user.id);
            res.status(status_code_constant_1.StatusCode.OK).send();
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getNewsReactions(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.newsService.getNewsReactions(newsId);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.NewsMessage.NEWS_REACTION_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createNewsReactions(req, res, next) {
        try {
            const newsId = parseInt(req.params.id, 10);
            if (isNaN(newsId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw (0, console_1.error)("User not found");
            }
            const result = await this.newsService.createNewsReactions(newsId, req.user.id);
            res
                .status(status_code_constant_1.StatusCode.CREATED)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.NewsMessage.NEWS_REACTION_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.NewsMessage.NEWS_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
}
exports.NewsController = NewsController;
