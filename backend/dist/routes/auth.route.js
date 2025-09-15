"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("../middlewares/validate");
const auth_validator_1 = require("../validators/auth.validator");
class AuthRoutes {
    constructor(authController) {
        this.router = (0, express_1.Router)();
        this.authController = authController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.post("/login", (0, validate_1.validate)(auth_validator_1.LoginSchema), this.authController.login.bind(this.authController));
        this.router.post("/logout", this.authController.logout.bind(this.authController));
        this.router.post("/refresh", this.authController.refreshToken.bind(this.authController));
    }
    getRoutes() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
