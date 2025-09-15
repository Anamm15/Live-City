"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const message_constants_1 = require("../helpers/message.constants");
const encode_1 = require("../utils/encode");
const errors_1 = require("../utils/errors");
const jwt_1 = require("../utils/jwt");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new errors_1.NotFoundError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const isPasswordValid = await (0, encode_1.comparePasswords)(password, user.password);
            if (!isPasswordValid) {
                throw new errors_1.UnauthenticatedError(message_constants_1.UserMessage.USER_PASSWORD_INCORRECT);
            }
            const accessToken = jwt_1.JWTService.generateToken({
                id: user.id.toString(),
                role: user.role,
            }, "access");
            const refreshToken = jwt_1.JWTService.generateToken({
                id: user.id.toString(),
                role: user.role,
            }, "refresh");
            const response = {
                accessToken,
                refreshToken,
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async logout(id) {
        try {
            await this.userRepository.updateRefreshToken(id, null);
        }
        catch (error) {
            throw error;
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = jwt_1.JWTService.verifyToken(refreshToken, "refresh");
            if (!payload) {
                throw new Error("Invalid refresh token");
            }
            const newAccessToken = jwt_1.JWTService.generateToken({
                id: payload.id,
                role: payload.role,
            }, "access");
            return newAccessToken;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.AuthService = AuthService;
