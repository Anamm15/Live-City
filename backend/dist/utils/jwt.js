"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
class JWTService {
    static generateToken(payload, type) {
        const secret = type === "access" ? jwt_1.jwtConfig.ACCESS_KEY : jwt_1.jwtConfig.REFRESH_KEY;
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: type === "access" ? "1h" : "7d",
        });
    }
    static verifyToken(token, type) {
        const secret = type === "access" ? jwt_1.jwtConfig.ACCESS_KEY : jwt_1.jwtConfig.REFRESH_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
}
exports.JWTService = JWTService;
