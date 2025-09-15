"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const client_1 = require("@prisma/client");
const validate_1 = require("../middlewares/validate");
const submission_validator_1 = require("../validators/submission.validator");
const upload_1 = __importDefault(require("../middlewares/upload"));
class SubmissionRoutes {
    constructor(submissionController) {
        this.router = (0, express_1.Router)();
        this.submissionController = submissionController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, (0, authorization_1.default)(client_1.Role.ADMIN), this.submissionController.getSubmissions.bind(this.submissionController));
        this.router.get("/:id", authentication_1.default, this.submissionController.getSubmissionById.bind(this.submissionController));
        this.router.get("/user/:userId", authentication_1.default, this.submissionController.getSubmissionsByUserId.bind(this.submissionController));
        this.router.post("/", authentication_1.default, upload_1.default.single("file"), (0, validate_1.validate)(submission_validator_1.CreateSubmissionSchema), this.submissionController.createSubmission.bind(this.submissionController));
        this.router.patch("/:id", authentication_1.default, (0, validate_1.validate)(submission_validator_1.UpdateSubmissionSchema), this.submissionController.updateSubmission.bind(this.submissionController));
        this.router.patch("/:id/status", authentication_1.default, (0, validate_1.validate)(submission_validator_1.UpdateSubmissionStatusSchema), (0, authorization_1.default)(client_1.Role.ADMIN), this.submissionController.updateSubmissionStatus.bind(this.submissionController));
        this.router.delete("/:id", authentication_1.default, this.submissionController.deleteSubmission.bind(this.submissionController));
        return this.router;
    }
    getRoutes() {
        return this.router;
    }
}
exports.SubmissionRoutes = SubmissionRoutes;
