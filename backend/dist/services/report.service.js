"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const app_constants_1 = require("../helpers/app.constants");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const format_1 = require("../utils/format");
const uuid_1 = require("../utils/uuid");
class ReportService {
    constructor(reportRepository, fileRepository, prisma) {
        this.reportRepository = reportRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getReports(page, filter) {
        try {
            if (page < 1)
                page = 1;
            const offset = (page - 1) * app_constants_1.LIMIT_REPORT_PAGE;
            const reports = await this.reportRepository.getReports(filter, offset, app_constants_1.LIMIT_REPORT_PAGE);
            if (reports.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.ReportMessage.REPORT_NOT_FOUND);
            }
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
    async getReportById(id) {
        try {
            const report = await this.reportRepository.getReportById(id);
            if (!report) {
                throw new errors_1.NotFoundError(message_constants_1.ReportMessage.REPORT_NOT_FOUND);
            }
            return report;
        }
        catch (error) {
            throw error;
        }
    }
    async getReportsByUserId(userId) {
        try {
            const reports = await this.reportRepository.getReportsByUserId(userId);
            if (reports.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.ReportMessage.REPORT_NOT_FOUND);
            }
            return reports;
        }
        catch (error) {
            throw error;
        }
    }
    async createReport(userId, report, file) {
        let cloudinaryResult = null;
        let data = { ...report, userId };
        return await this.prisma.$transaction(async (tx) => {
            try {
                const uuid = (0, uuid_1.generateUUIDWithPrefix)(app_constants_1.PrefixType.REPORT);
                data.shortId = uuid;
                const newReport = await this.reportRepository.createReport(data, tx);
                const newFilename = (0, format_1.generateFilename)(client_1.FileableType.REPORT, newReport.id);
                cloudinaryResult = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: app_constants_1.CloudFolderName.REPORT,
                    public_id: newFilename,
                });
                fs_1.default.unlinkSync(file.path);
                const fileData = {
                    urlFile: cloudinaryResult.secure_url,
                    fileableId: newReport.id,
                    fileableType: client_1.FileableType.REPORT,
                };
                await this.fileRepository.uploadFile(fileData, tx);
                return newReport;
            }
            catch (error) {
                if (cloudinaryResult?.public_id) {
                    await cloudinary_1.default.uploader.destroy(cloudinaryResult.public_id);
                }
                throw error;
            }
        });
    }
    async updateReport(id, userId, report) {
        try {
            return this.reportRepository.updateReport(id, userId, report);
        }
        catch (error) {
            throw error;
        }
    }
    async updateResponseReport(id, report) {
        try {
            return this.reportRepository.updateResponseReport(id, report);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteReport(id, userId) {
        try {
            return this.reportRepository.deleteReport(id, userId);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ReportService = ReportService;
