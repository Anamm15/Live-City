"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .send((0, response_1.buildResponseError)("Unauthorized: Token not found", "Token is missing or malformed"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt_1.JWTService.verifyToken(token, "access");
        req.user = {
            id: parseInt(payload.id, 10),
            role: payload.role,
        };
        next();
    }
    catch (error) {
        return res
            .status(401)
            .send((0, response_1.buildResponseError)("Unauthorized: Invalid token", "Token verification failed"));
    }
};
exports.default = authMiddleware;
