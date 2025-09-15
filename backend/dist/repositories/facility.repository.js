"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRepository = void 0;
const errors_1 = require("../utils/errors");
const selectedFacilityFields = {
    id: true,
    name: true,
    description: true,
    latitude: true,
    longitude: true,
    buildDate: true,
};
class FacilityRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFacilities() {
        try {
            const facilities = await this.prisma.facilities.findMany({
                select: selectedFacilityFields,
                orderBy: { name: "asc" },
            });
            return facilities;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getFacilityById(id) {
        try {
            const facility = await this.prisma.facilities.findUnique({
                where: { id },
                select: selectedFacilityFields,
            });
            return facility;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createFacility(data, tx) {
        try {
            const newFacility = await tx.facilities.create({
                data,
                select: selectedFacilityFields,
            });
            return newFacility;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateFacility(id, data) {
        try {
            const updatedFacility = await this.prisma.facilities.update({
                where: { id: id },
                data,
                select: selectedFacilityFields,
            });
            return updatedFacility;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteFacility(id) {
        try {
            await this.prisma.facilities.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.FacilityRepository = FacilityRepository;
