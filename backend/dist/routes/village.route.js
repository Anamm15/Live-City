"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validate_1 = require("../middlewares/validate");
const village_validator_1 = require("../validators/village.validator");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
class VillageRoutes {
    constructor(villageController) {
        this.router = (0, express_1.Router)();
        this.villageController = villageController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.villageController.getVillages.bind(this.villageController));
        this.router.post("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(village_validator_1.CreateVillageSchema), this.villageController.createVillage.bind(this.villageController));
        this.router.patch("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(village_validator_1.UpdateVillageSchema), this.villageController.updateVillage.bind(this.villageController));
        this.router.delete("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.villageController.deleteVillage.bind(this.villageController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.VillageRoutes = VillageRoutes;
