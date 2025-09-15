"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const validate_1 = require("../middlewares/validate");
const report_validator_1 = require("../validators/report.validator");
const client_1 = require("@prisma/client");
const upload_1 = __importDefault(require("../middlewares/upload"));
class ReportRoutes {
    constructor(reportController) {
        this.router = (0, express_1.Router)();
        this.reportController = reportController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.reportController.getReports.bind(this.reportController));
        this.router.get("/:id", authentication_1.default, this.reportController.getReportById.bind(this.reportController));
        this.router.get("/user", authentication_1.default, this.reportController.getReportsByUserId.bind(this.reportController));
        this.router.post("/", authentication_1.default, upload_1.default.single("file"), (0, validate_1.validate)(report_validator_1.CreateReportSchema), this.reportController.createReport.bind(this.reportController));
        this.router.patch("/:id", authentication_1.default, (0, validate_1.validate)(report_validator_1.UpdateReportSchema), this.reportController.updateReport.bind(this.reportController));
        this.router.patch("/:id/response", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), (0, validate_1.validate)(report_validator_1.UpdateResponseReportSchema), this.reportController.updateResponseReport.bind(this.reportController));
        this.router.delete("/:id", authentication_1.default, this.reportController.deleteReport.bind(this.reportController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.ReportRoutes = ReportRoutes;
