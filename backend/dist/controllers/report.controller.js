"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
const entity_constants_1 = require("../helpers/entity.constants");
class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getReports(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let filter = req.query.filter || '';
            if (filter && !entity_constants_1.ReportStatus.includes(filter)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.reportService.getReports(page, filter);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.ReportMessage.REPORT_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getReportById(req, res, next) {
        try {
            const reportId = parseInt(req.params.id, 10);
            if (isNaN(reportId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.reportService.getReportById(reportId);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(result, message_constants_1.ReportMessage.REPORT_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getReportsByUserId(req, res, next) {
        try {
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const results = await this.reportService.getReportsByUserId(req.user.id);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.ReportMessage.REPORT_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createReport(req, res, next) {
        try {
            if (!req.file) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.FILE_NOT_FOUND);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const results = await this.reportService.createReport(req.user.id, req.body, req.file);
            res.status(status_code_constant_1.StatusCode.CREATED).send((0, response_1.buildResponseSuccess)(results, message_constants_1.ReportMessage.REPORT_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.FILE_NOT_FOUND));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_CREATE_FAILED));
            }
        }
    }
    async updateReport(req, res, next) {
        try {
            const reportId = parseInt(req.params.id, 10);
            if (isNaN(reportId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            const result = await this.reportService.updateReport(reportId, req.user.id, req.body);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(result, message_constants_1.ReportMessage.REPORT_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_UPDATE_FAILED));
            }
        }
    }
    async updateResponseReport(req, res, next) {
        try {
            const reportId = parseInt(req.params.id, 10);
            if (isNaN(reportId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.reportService.updateResponseReport(reportId, req.body);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(result, message_constants_1.ReportMessage.REPORT_RESPONSE_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_RESPONSE_UPDATE_FAILED));
            }
        }
    }
    async deleteReport(req, res, next) {
        try {
            const reportId = parseInt(req.params.id, 10);
            if (isNaN(reportId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            if (!req.user) {
                throw new errors_1.BadRequestError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            await this.reportService.deleteReport(reportId, req.user.id);
            res.status(status_code_constant_1.StatusCode.NO_CONTENT).send();
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.ReportMessage.REPORT_DELETE_FAILED));
            }
        }
    }
}
exports.ReportController = ReportController;
