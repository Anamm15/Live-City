"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const errors_1 = require("../utils/errors");
const selectedFileFields = {
    id: true,
    urlFile: true,
    fileableId: true,
    fileableType: true,
};
class FileRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFile(id) {
        try {
            const file = await this.prisma.files.findUnique({
                where: { id },
                select: selectedFileFields,
            });
            return file;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async uploadFile(data, tx) {
        try {
            const newFile = await tx.files.create({
                data,
                select: selectedFileFields,
            });
            return newFile;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateFile(id, data) {
        try {
            const updatedFile = await this.prisma.files.update({
                where: { id },
                data,
                select: selectedFileFields,
            });
            return updatedFile;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteFile(id) {
        try {
            await this.prisma.files.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.FileRepository = FileRepository;
