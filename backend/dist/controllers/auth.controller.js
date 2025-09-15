"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const status_code_constant_1 = require("../helpers/status_code.constant");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res, next) {
        try {
            const data = await this.authService.login(req.body.email, req.body.password);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)({ token: data.accessToken }, message_constants_1.UserMessage.USER_LOGIN_SUCCESSFUL));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_LOGIN_FAILED));
                return;
            }
            else if (error instanceof errors_1.UnauthenticatedError) {
                res
                    .status(status_code_constant_1.StatusCode.UNAUTHORIZED)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_LOGIN_FAILED));
                return;
            }
        }
    }
    async logout(req, res, next) {
        try {
            await this.authService.logout(req.body.id);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)(null, message_constants_1.UserMessage.USER_LOGOUT_SUCCESSFUL));
        }
        catch (error) {
            res
                .status(401)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.UserMessage.USER_LOGOUT_FAILED));
        }
    }
    async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                throw new Error("No refresh token provided");
            }
            const newToken = await this.authService.refreshToken(refreshToken);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)({ token: newToken }, message_constants_1.CommonMessage.TOKEN_REFRESHED));
        }
        catch (error) {
            res
                .status(401)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.TOKEN_REFRESH_FAILED));
        }
    }
}
exports.AuthController = AuthController;
