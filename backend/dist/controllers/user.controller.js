"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const status_code_constant_1 = require("../helpers/status_code.constant");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(req, res, next) {
        try {
            const results = await this.userService.getUsers();
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.UserMessage.USERS_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getMe(req, res, next) {
        try {
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const userId = req.user?.id;
            if (isNaN(userId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const user = await this.userService.getUserById(userId);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(user, message_constants_1.UserMessage.USER_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getUserById(req, res, next) {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const user = await this.userService.getUserById(userId);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(user, message_constants_1.UserMessage.USER_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_NOT_FOUND));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createUser(req, res, next) {
        try {
            const newUser = await this.userService.createUser(req.body);
            res
                .status(status_code_constant_1.StatusCode.CREATED)
                .send((0, response_1.buildResponseSuccess)(newUser, message_constants_1.UserMessage.USER_CREATED));
        }
        catch (error) {
            res
                .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_CREATE_FAILED));
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const updatedUser = await this.userService.updateUser(userId, req.body);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(updatedUser, message_constants_1.UserMessage.USER_UPDATED));
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
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_UPDATE_FAILED));
            }
        }
    }
    async deleteUser(req, res, next) {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            await this.userService.deleteUser(userId);
            res.status(status_code_constant_1.StatusCode.NO_CONTENT).send();
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
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_DELETE_FAILED));
            }
        }
    }
}
exports.UserController = UserController;
