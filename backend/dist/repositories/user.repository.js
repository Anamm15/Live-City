"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const errors_1 = require("../utils/errors");
const userSelectFields = {
    id: true,
    nationalIdentityNumber: true,
    name: true,
    email: true,
    gender: true,
    role: true,
    birthday: true,
    birthplace: true,
    religion: true,
    maritalStatus: true,
    education: true,
    job: true,
    phoneNumber: true,
    points: true,
};
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers() {
        try {
            return this.prisma.users.findMany({
                select: userSelectFields,
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getUserById(id) {
        try {
            return this.prisma.users.findUnique({
                where: { id: id },
                select: userSelectFields,
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async getUserByEmail(email) {
        try {
            return this.prisma.users.findUnique({
                where: { email: email },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async createUser(data) {
        try {
            return this.prisma.users.create({
                data,
                select: userSelectFields,
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateUser(id, data) {
        try {
            return this.prisma.users.update({
                where: { id: id },
                data,
                select: userSelectFields,
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async updateRefreshToken(id, refreshToken) {
        try {
            await this.prisma.users.update({
                where: { id: id },
                data: { refreshToken: refreshToken },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.users.delete({
                where: { id: id },
            });
        }
        catch (error) {
            throw new errors_1.AppError(error.message);
        }
    }
}
exports.UserRepository = UserRepository;
