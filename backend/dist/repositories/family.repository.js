"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyRepository = void 0;
const errors_1 = require("../utils/errors");
const selectedFamilyFields = {
    id: true,
    familyNumber: true,
    headFamily: true,
    economicStatus: true,
    address: true,
    createdAt: true,
};
const selectedFamilyFieldsWithMembers = {
    id: true,
    familyNumber: true,
    headFamily: true,
    economicStatus: true,
    address: true,
    createdAt: true,
    users: {
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
        },
    },
};
class FamilyRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFamilies() {
        try {
            const families = await this.prisma.families.findMany({
                select: selectedFamilyFields,
            });
            return families;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getFamilyWithMembers(id) {
        try {
            const family = await this.prisma.families.findUnique({
                where: { id },
                select: selectedFamilyFieldsWithMembers,
            });
            return family;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createFamily(data) {
        try {
            const createdFamily = await this.prisma.families.create({
                data,
                select: selectedFamilyFields,
            });
            return createdFamily;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateFamily(id, data) {
        try {
            const updatedFamily = await this.prisma.families.update({
                where: { id },
                data,
                select: selectedFamilyFields,
            });
            return updatedFamily;
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteFamily(id) {
        try {
            await this.prisma.families.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.FamilyRepository = FamilyRepository;
