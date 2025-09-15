"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityController = void 0;
const message_constants_1 = require("../helpers/message.constants");
const response_1 = require("../utils/response");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
class FacilityController {
    constructor(facilityService) {
        this.facilityService = facilityService;
    }
    async getFacilities(req, res, next) {
        try {
            const results = await this.facilityService.getFacilities();
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.FacilityMessage.FACILITY_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.FacilityMessage.FACILITY_NOT_FOUND));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async getFacilityById(req, res, next) {
        try {
            const facilityId = parseInt(req.params.id, 10);
            if (isNaN(facilityId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.facilityService.getFacilityById(facilityId);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(result, message_constants_1.FacilityMessage.FACILITY_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.FacilityMessage.FACILITY_NOT_FOUND));
            }
            else if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createFacility(req, res, next) {
        try {
            if (!req.file) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.FILE_NOT_FOUND);
            }
            const result = await this.facilityService.createFacility(req.body, req.file);
            res.status(status_code_constant_1.StatusCode.CREATED).send((0, response_1.buildResponseSuccess)(result, message_constants_1.FacilityMessage.FACILITY_CREATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.FILE_NOT_FOUND));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FacilityMessage.FACILITY_CREATE_FAILED));
            }
        }
    }
    async updateFacility(req, res, next) {
        try {
            const facilityId = parseInt(req.params.id, 10);
            if (isNaN(facilityId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const result = await this.facilityService.updateFacility(facilityId, req.body);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(result, message_constants_1.FacilityMessage.FACILITY_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FacilityMessage.FACILITY_UPDATE_FAILED));
            }
        }
    }
    async deleteFacility(req, res, next) {
        try {
            const facilityId = parseInt(req.params.id, 10);
            if (isNaN(facilityId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            await this.facilityService.deleteFacility(facilityId);
            res.status(status_code_constant_1.StatusCode.NO_CONTENT).send();
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.INVALID_PARAMS));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.FacilityMessage.FACILITY_DELETE_FAILED));
            }
        }
    }
}
exports.FacilityController = FacilityController;
