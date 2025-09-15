"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const app_constants_1 = require("../helpers/app.constants");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
const format_1 = require("../utils/format");
const uuid_1 = require("../utils/uuid");
class SubmissionService {
    constructor(submissionRepository, fileRepository, prisma) {
        this.submissionRepository = submissionRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getSubmissions(page, filter) {
        try {
            if (page < 1)
                page = 1;
            const offset = (page - 1) * app_constants_1.LIMIT_SUBMISSION_PAGE;
            const submissions = await this.submissionRepository.getSubmissions(filter, offset, app_constants_1.LIMIT_SUBMISSION_PAGE);
            if (submissions.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND);
            }
            return submissions;
        }
        catch (error) {
            throw error;
        }
    }
    async getSubmissionById(id) {
        try {
            const submission = await this.submissionRepository.getSubmissionById(id);
            if (!submission) {
                throw new errors_1.NotFoundError(message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND);
            }
            return submission;
        }
        catch (error) {
            throw error;
        }
    }
    async getSubmissionsByUserId(userId) {
        try {
            const submissions = await this.submissionRepository.getSubmissionsByUserId(userId);
            if (!submissions) {
                throw new errors_1.NotFoundError(message_constants_1.SubmissionMessage.SUBMISSION_NOT_FOUND);
            }
            return submissions;
        }
        catch (error) {
            throw error;
        }
    }
    async createSubmission(userId, submission, file) {
        let cloudinaryResult = null;
        let data = { ...submission, userId };
        return await this.prisma.$transaction(async (tx) => {
            try {
                data.shortId = (0, uuid_1.generateUUIDWithPrefix)(app_constants_1.PrefixType.SUBMISSION);
                const newSubmission = await this.submissionRepository.createSubmission(data, tx);
                const newFilename = (0, format_1.generateFilename)(client_1.FileableType.SUBMISSION, newSubmission.id);
                cloudinaryResult = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: app_constants_1.CloudFolderName.SUBMISSION,
                    public_id: newFilename,
                });
                fs_1.default.unlinkSync(file.path);
                const fileData = {
                    urlFile: cloudinaryResult.secure_url,
                    fileableId: newSubmission.id,
                    fileableType: client_1.FileableType.SUBMISSION,
                };
                await this.fileRepository.uploadFile(fileData, tx);
                return newSubmission;
            }
            catch (error) {
                if (cloudinaryResult?.public_id) {
                    await cloudinary_1.default.uploader.destroy(cloudinaryResult.public_id);
                }
                throw error;
            }
        });
    }
    async updateSubmission(id, userId, submission) {
        try {
            return this.submissionRepository.updateSubmission(id, userId, submission);
        }
        catch (error) {
            throw error;
        }
    }
    async updateSubmissionStatus(id, status) {
        try {
            return this.submissionRepository.updateSubmissionStatus(id, status);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteSubmission(id, userId) {
        try {
            return this.submissionRepository.deleteSubmission(id, userId);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.SubmissionService = SubmissionService;
