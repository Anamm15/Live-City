"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
const entity_constants_1 = require("../helpers/entity.constants");
class SubmissionController {
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    async getSubmissions(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let filter = req.query.filter || "";
            if (filter &&
                !entity_constants_1.SubmissionStatus.includes(filter)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.submissionService.getSubmissions(page, filter);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.SubmissionMessage.SUBMISSION_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getSubmissionById(req, res, next) {
        try {
            const submissionId = parseInt(req.params.id, 10);
            if (isNaN(submissionId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.submissionService.getSubmissionById(submissionId);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.SubmissionMessage.SUBMISSION_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getSubmissionsByUserId(req, res, next) {
        try {
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const results = await this.submissionService.getSubmissionsByUserId(req.user.id);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.SubmissionMessage.SUBMISSION_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res
                    .status(status_code_constant_1.StatusCode.NOT_FOUND)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createSubmission(req, res, next) {
        try {
            if (!req.file) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const result = await this.submissionService.createSubmission(req.user.id, req.body, req.file);
            res
                .status(status_code_constant_1.StatusCode.CREATED)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.SubmissionMessage.SUBMISSION_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async updateSubmission(req, res, next) {
        try {
            const submissionId = parseInt(req.params.id, 10);
            if (isNaN(submissionId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const result = await this.submissionService.updateSubmission(submissionId, req.user.id, req.body);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.SubmissionMessage.SUBMISSION_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async updateSubmissionStatus(req, res, next) {
        try {
            const submissionId = parseInt(req.params.id, 10);
            if (isNaN(submissionId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.submissionService.updateSubmissionStatus(submissionId, req.body.status);
            res
                .status(status_code_constant_1.StatusCode.OK)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.SubmissionMessage.SUBMISSION_STATUS_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async deleteSubmission(req, res, next) {
        try {
            const submissionId = parseInt(req.params.id, 10);
            if (isNaN(submissionId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            await this.submissionService.deleteSubmission(submissionId, req.user.id);
            res.status(204).send();
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res
                    .status(status_code_constant_1.StatusCode.BAD_REQUEST)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res
                    .status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR)
                    .send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
}
exports.SubmissionController = SubmissionController;
