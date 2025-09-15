"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const format_1 = require("../utils/format");
const app_constants_1 = require("../helpers/app.constants");
class FacilityService {
    constructor(facilityRepository, fileRepository, prisma) {
        this.facilityRepository = facilityRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getFacilities() {
        try {
            const facilities = await this.facilityRepository.getFacilities();
            if (facilities.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.FacilityMessage.FACILITY_NOT_FOUND);
            }
            return facilities;
        }
        catch (error) {
            throw error;
        }
    }
    async getFacilityById(id) {
        try {
            const facility = await this.facilityRepository.getFacilityById(id);
            if (!facility) {
                throw new errors_1.NotFoundError(message_constants_1.FacilityMessage.FACILITY_NOT_FOUND);
            }
            return facility;
        }
        catch (error) {
            throw error;
        }
    }
    async createFacility(data, file) {
        let cloudinaryResult = null;
        return await this.prisma.$transaction(async (tx) => {
            try {
                const newFacility = await this.facilityRepository.createFacility(data, tx);
                const newFilename = (0, format_1.generateFilename)(client_1.FileableType.FACILITY, newFacility.id);
                cloudinaryResult = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: app_constants_1.CloudFolderName.FACILITY,
                    public_id: newFilename,
                });
                fs_1.default.unlinkSync(file.path);
                const fileData = {
                    urlFile: cloudinaryResult.secure_url,
                    fileableId: newFacility.id,
                    fileableType: client_1.FileableType.FACILITY,
                };
                await this.fileRepository.uploadFile(fileData, tx);
                return newFacility;
            }
            catch (error) {
                if (cloudinaryResult?.public_id) {
                    await cloudinary_1.default.uploader.destroy(cloudinaryResult.public_id);
                }
                throw error;
            }
        });
    }
    async updateFacility(id, data) {
        try {
            return this.facilityRepository.updateFacility(id, data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFacility(id) {
        try {
            return this.facilityRepository.deleteFacility(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.FacilityService = FacilityService;
