"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageController = void 0;
const message_constants_1 = require("../helpers/message.constants");
const response_1 = require("../utils/response");
const status_code_constant_1 = require("../helpers/status_code.constant");
const errors_1 = require("../utils/errors");
class VillageController {
    constructor(villageService) {
        this.villageService = villageService;
    }
    async getVillages(req, res, next) {
        try {
            const results = await this.villageService.getVillages();
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.VillageMessage.VILLAGE_RETRIEVED));
        }
        catch (error) {
            if (error instanceof errors_1.NotFoundError) {
                res.status(status_code_constant_1.StatusCode.NOT_FOUND).send((0, response_1.buildResponseError)(error.message, message_constants_1.VillageMessage.VILLAGE_NOT_FOUND));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async createVillage(req, res, next) {
        try {
            if (!req.file) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.FILE_NOT_FOUND);
            }
            const results = await this.villageService.createVillage(req.body, req.file);
            res.status(status_code_constant_1.StatusCode.CREATED).send((0, response_1.buildResponseSuccess)(results, message_constants_1.VillageMessage.VILLAGE_CREATED));
        }
        catch (error) {
            res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.VillageMessage.VILLAGE_CREATE_FAILED));
        }
    }
    async updateVillage(req, res, next) {
        try {
            const villageId = parseInt(req.params.id, 10);
            if (isNaN(villageId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            const results = await this.villageService.updateVillage(villageId, req.body);
            res.status(status_code_constant_1.StatusCode.OK).send((0, response_1.buildResponseSuccess)(results, message_constants_1.VillageMessage.VILLAGE_UPDATED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.VillageMessage.VILLAGE_UPDATE_FAILED));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
    async deleteVillage(req, res, next) {
        try {
            const villageId = parseInt(req.params.id, 10);
            if (isNaN(villageId)) {
                throw new errors_1.BadRequestError(message_constants_1.CommonMessage.INVALID_PARAMS);
            }
            await this.villageService.deleteVillage(villageId);
            res.status(204).send((0, response_1.buildResponseSuccess)(null, message_constants_1.VillageMessage.VILLAGE_DELETED));
        }
        catch (error) {
            if (error instanceof errors_1.BadRequestError) {
                res.status(status_code_constant_1.StatusCode.BAD_REQUEST).send((0, response_1.buildResponseError)(error.message, message_constants_1.VillageMessage.VILLAGE_DELETE_FAILED));
            }
            else {
                res.status(status_code_constant_1.StatusCode.INTERNAL_SERVER_ERROR).send((0, response_1.buildResponseError)(error.message, message_constants_1.CommonMessage.SERVER_ERROR));
            }
        }
    }
}
exports.VillageController = VillageController;
