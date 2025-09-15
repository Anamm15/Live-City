"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validate_1 = require("../middlewares/validate");
const user_validator_1 = require("../validators/user.validator");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
class UserRoutes {
    constructor(userController) {
        this.router = (0, express_1.Router)();
        this.userController = userController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.userController.getUsers.bind(this.userController));
        this.router.get("/me", authentication_1.default, this.userController.getMe.bind(this.userController));
        this.router.get("/:id", authentication_1.default, this.userController.getUserById.bind(this.userController));
        this.router.post("/", authentication_1.default, (0, validate_1.validate)(user_validator_1.CreateUserSchema), this.userController.createUser.bind(this.userController));
        this.router.patch("/:id", authentication_1.default, (0, validate_1.validate)(user_validator_1.UpdateUserSchema), this.userController.updateUser.bind(this.userController));
        this.router.delete("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.userController.deleteUser.bind(this.userController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
