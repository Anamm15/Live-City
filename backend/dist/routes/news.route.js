"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRoutes = void 0;
const express_1 = require("express");
const upload_1 = __importDefault(require("../middlewares/upload"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
const validate_1 = require("../middlewares/validate");
const news_validator_1 = require("../validators/news.validator");
class NewsRoutes {
    constructor(newsController) {
        this.router = (0, express_1.Router)();
        this.newsController = newsController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.newsController.getNews.bind(this.newsController));
        this.router.get("/:id", authentication_1.default, this.newsController.getNewsById.bind(this.newsController));
        this.router.post("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), upload_1.default.single("file"), (0, validate_1.validate)(news_validator_1.CreateNewsSchema), this.newsController.createNews.bind(this.newsController));
        this.router.patch("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(news_validator_1.UpdateNewsSchema), this.newsController.updateNews.bind(this.newsController));
        this.router.delete("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.newsController.deleteNews.bind(this.newsController));
        this.router.get("/:id/comments", authentication_1.default, this.newsController.getNewsComments.bind(this.newsController));
        this.router.post("/:id/comments", authentication_1.default, (0, validate_1.validate)(news_validator_1.CreateNewsCommentSchema), this.newsController.createNewsComment.bind(this.newsController));
        this.router.delete("/comments/:commentId", authentication_1.default, this.newsController.deleteNewsComment.bind(this.newsController));
        this.router.get("/:id/reactions", authentication_1.default, this.newsController.getNewsReactions.bind(this.newsController));
        this.router.post("/:id/reactions", authentication_1.default, (0, validate_1.validate)(news_validator_1.CreateNewsReactionSchema), this.newsController.createNewsReactions.bind(this.newsController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.NewsRoutes = NewsRoutes;
