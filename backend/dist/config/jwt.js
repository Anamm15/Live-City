"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    ACCESS_KEY: process.env.JWT_ACCESS_KEY || "default_access_secret",
    REFRESH_KEY: process.env.JWT_REFRESH_KEY || "default_refresh_secret",
    expiresIn: "1h",
};
