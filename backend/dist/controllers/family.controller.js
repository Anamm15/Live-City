"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
class FamilyController {
    constructor(familyService) {
        this.familyService = familyService;
    }
    async getFamilies(req, res, next) {
        try {
            const results = await this.familyService.getFamilies();
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.FamilyMessage.FAMILY_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.FamilyMessage.FAMILY_NOT_FOUND));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getFamilyWithMembers(req, res, next) {
        try {
            const familyId = parseInt(req.params.id, 10);
            if (isNaN(familyId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.familyService.getFamilyWithMembers(familyId);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.FamilyMessage.FAMILY_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.FamilyMessage.FAMILY_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createFamily(req, res, next) {
        try {
            const results = await this.familyService.createFamily(req.body);
            res.status(status_code_constant_1.StatusCode.CREATED).send((0, response_1.buildResponseSuccess)(results, message_constants_1.FamilyMessage.FAMILY_CREATED));
        }
        catch (error) {
            res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FamilyMessage.FAMILY_CREATE_FAILED));
        }
    }
    async updateFamily(req, res, next) {
        try {
            const familyId = parseInt(req.params.id, 10);
            if (isNaN(familyId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.familyService.updateFamily(familyId, req.body);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.FamilyMessage.FAMILY_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FamilyMessage.FAMILY_UPDATE_FAILED));
            }
        }
    }
    async deleteFamily(req, res, next) {
        try {
            const familyId = parseInt(req.params.id, 10);
            if (isNaN(familyId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            await this.familyService.deleteFamily(familyId);
            res.status(status_code_constant_1.StatusCode.NO_CONTENT).send();
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FamilyMessage.FAMILY_DELETE_FAILED));
            }
        }
    }
}
exports.FamilyController = FamilyController;
