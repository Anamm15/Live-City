"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.NotFoundError = exports.ConflictError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthenticatedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
