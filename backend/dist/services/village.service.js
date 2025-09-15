"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const message_constants_1 = require("../helpers/message.constants");
const format_1 = require("../utils/format");
const app_constants_1 = require("../helpers/app.constants");
class VillageService {
    constructor(villageRepository, fileRepository, prisma) {
        this.villageRepository = villageRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getVillages() {
        try {
            const villages = await this.villageRepository.getVillages();
            if (villages.length === 0)
                throw new Error(message_constants_1.VillageMessage.VILLAGE_NOT_FOUND);
            return villages;
        }
        catch (error) {
            throw error;
        }
    }
    async createVillage(data, file) {
        let cloudinaryResult = null;
        return await this.prisma.$transaction(async (tx) => {
            try {
                const newVillage = await this.villageRepository.createVillage(data, tx);
                const newFilename = (0, format_1.generateFilename)(client_1.FileableType.VILLAGE, newVillage.id);
                cloudinaryResult = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: app_constants_1.CloudFolderName.VILLAGE,
                    public_id: newFilename,
                });
                fs_1.default.unlinkSync(file.path);
                const fileData = {
                    urlFile: cloudinaryResult.secure_url,
                    fileableId: newVillage.id,
                    fileableType: client_1.FileableType.VILLAGE,
                };
                await this.fileRepository.uploadFile(fileData, tx);
                return newVillage;
            }
            catch (error) {
                if (cloudinaryResult?.public_id) {
                    await cloudinary_1.default.uploader.destroy(cloudinaryResult.public_id);
                }
                throw error;
            }
        });
    }
    async updateVillage(id, data) {
        try {
            return this.villageRepository.updateVillage(id, data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteVillage(id) {
        try {
            return this.villageRepository.deleteVillage(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VillageService = VillageService;
