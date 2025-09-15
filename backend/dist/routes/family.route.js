"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
const validate_1 = require("../middlewares/validate");
const family_validator_1 = require("../validators/family.validator");
class FamilyRoutes {
    constructor(familyController) {
        this.router = (0, express_1.Router)();
        this.familyController = familyController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.familyController.getFamilies.bind(this.familyController));
        this.router.get("/:id", authentication_1.default, this.familyController.getFamilyWithMembers.bind(this.familyController));
        this.router.post("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(family_validator_1.CreateFamilySchema), this.familyController.createFamily.bind(this.familyController));
        this.router.patch("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(family_validator_1.UpdateFamilySchema), this.familyController.updateFamily.bind(this.familyController));
        this.router.delete("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.familyController.deleteFamily.bind(this.familyController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.FamilyRoutes = FamilyRoutes;
