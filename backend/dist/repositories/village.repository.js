"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillageRepository = void 0;
const errors_1 = require("../utils/errors");
const selectedVillageFields = {
    id: true,
    name: true,
    postalCode: true,
    latitude: true,
    longitude: true,
    createdAt: true,
};
class VillageRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVillages() {
        try {
            const villages = await this.prisma.villages.findMany({
                select: selectedVillageFields,
            });
            return villages;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createVillage(data, tx) {
        try {
            const newVillage = await tx.villages.create({
                data,
                select: selectedVillageFields,
            });
            return newVillage;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateVillage(id, data) {
        try {
            const updatedVillage = await this.prisma.villages.update({
                where: { id },
                data,
                select: selectedVillageFields,
            });
            return updatedVillage;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteVillage(id) {
        try {
            await this.prisma.villages.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.VillageRepository = VillageRepository;
