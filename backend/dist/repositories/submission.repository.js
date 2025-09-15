"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRepository = void 0;
const entity_constants_1 = require("../helpers/entity.constants");
const errors_1 = require("../utils/errors");
const submissionSelectFields = {
    id: true,
    shortId: true,
    title: true,
    date: true,
    category: true,
    status: true,
    description: true,
    user: {
        select: {
            id: true,
            name: true,
            nationalIdentityNumber: true,
            email: true,
            phoneNumber: true,
        },
    },
};
class SubmissionRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSubmissions(filter, offset, limit) {
        try {
            const submissions = await this.prisma.submissions.findMany({
                where: {
                    ...(filter &&
                        entity_constants_1.SubmissionStatus.includes(filter)
                        ? { status: filter }
                        : {}),
                },
                select: submissionSelectFields,
                skip: offset,
                take: limit,
                orderBy: { id: "desc" },
            });
            return submissions;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getSubmissionById(id) {
        try {
            const submission = await this.prisma.submissions.findUnique({
                where: { id },
                select: submissionSelectFields,
            });
            return submission;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getSubmissionsByUserId(userId) {
        try {
            const submissions = await this.prisma.submissions.findMany({
                where: { userId: userId },
                select: submissionSelectFields,
            });
            return submissions;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createSubmission(data, tx) {
        try {
            if (!data.userId || !data.shortId) {
                throw new errors_1.AppError("userId and shortId are required");
            }
            const newSubmission = await tx.submissions.create({
                data: {
                    ...data,
                    shortId: data.shortId,
                    userId: data.userId,
                },
                select: submissionSelectFields,
            });
            return newSubmission;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateSubmission(id, userId, data) {
        try {
            const updatedSubmission = await this.prisma.submissions.update({
                where: {
                    id,
                    userId,
                },
                data,
                select: submissionSelectFields,
            });
            return updatedSubmission;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateSubmissionStatus(id, status) {
        try {
            const updatedSubmission = await this.prisma.submissions.update({
                where: { id },
                data: { status },
            });
            return updatedSubmission;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteSubmission(id, userId) {
        try {
            await this.prisma.submissions.delete({
                where: {
                    id,
                    userId,
                },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.SubmissionRepository = SubmissionRepository;
