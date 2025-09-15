"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const entity_constants_1 = require("../helpers/entity.constants");
const errors_1 = require("../utils/errors");
const reportSelectedField = {
    id: true,
    shortId: true,
    title: true,
    description: true,
    category: true,
    status: true,
    response: true,
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
class ReportRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getReports(filter, offset, limit) {
        try {
            const reports = await this.prisma.reports.findMany({
                where: {
                    ...(filter && entity_constants_1.ReportStatus.includes(filter)
                        ? { status: filter }
                        : {}),
                },
                select: reportSelectedField,
                skip: offset,
                take: limit,
                orderBy: { id: "desc" },
            });
            return reports;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getReportById(id) {
        try {
            const report = await this.prisma.reports.findUnique({
                where: { id },
                select: reportSelectedField,
            });
            return report;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getReportsByUserId(userId) {
        try {
            const reports = await this.prisma.reports.findMany({
                where: { userId },
                select: reportSelectedField,
            });
            return reports;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createReport(data, tx) {
        try {
            if (!data.userId || !data.shortId) {
                throw new errors_1.AppError("userId and shortId are required");
            }
            const newReport = await tx.reports.create({
                data: {
                    ...data,
                    shortId: data.shortId,
                    userId: data.userId,
                },
                select: reportSelectedField,
            });
            return newReport;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateReport(id, userId, data) {
        try {
            const updatedReport = await this.prisma.reports.update({
                where: {
                    id,
                    userId,
                },
                data,
                select: reportSelectedField,
            });
            return updatedReport;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateResponseReport(id, data) {
        try {
            const updatedReport = await this.prisma.reports.update({
                where: { id: id },
                data,
                select: reportSelectedField,
            });
            return updatedReport;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteReport(id, userId) {
        try {
            await this.prisma.reports.delete({
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
exports.ReportRepository = ReportRepository;
