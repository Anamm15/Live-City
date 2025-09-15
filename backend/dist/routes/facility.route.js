"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
const validate_1 = require("../middlewares/validate");
const facility_validator_1 = require("../validators/facility.validator");
const upload_1 = __importDefault(require("../middlewares/upload"));
class FacilityRoutes {
    constructor(facilityController) {
        this.router = (0, express_1.Router)();
        this.facilityController = facilityController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.facilityController.getFacilities.bind(this.facilityController));
        this.router.get("/:id", authentication_1.default, this.facilityController.getFacilityById.bind(this.facilityController));
        this.router.post("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), upload_1.default.single("file"), (0, validate_1.validate)(facility_validator_1.CreateFacilitySchema), this.facilityController.createFacility.bind(this.facilityController));
        this.router.patch("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(facility_validator_1.UpdateFacilitySchema), this.facilityController.updateFacility.bind(this.facilityController));
        this.router.delete("/:id", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.facilityController.deleteFacility.bind(this.facilityController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.FacilityRoutes = FacilityRoutes;
