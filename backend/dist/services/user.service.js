"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const message_constants_1 = require("../helpers/message.constants");
const encode_1 = require("../utils/encode");
const errors_1 = require("../utils/errors");
class UserService {
    constructor(userRepository, fileRepository, prisma) {
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
        this.prisma = prisma;
    }
    async getUsers() {
        try {
            const users = await this.userRepository.getUsers();
            if (users.length === 0) {
                throw new errors_1.NotFoundError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new errors_1.NotFoundError(message_constants_1.UserMessage.USER_NOT_FOUND);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async createUser(userData) {
        try {
            const hashedPassword = await (0, encode_1.hashPassword)(userData.password);
            const userToCreate = {
                ...userData,
                password: hashedPassword,
            };
            const createdUser = await this.userRepository.createUser(userToCreate);
            return createdUser;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            return this.userRepository.updateUser(id, userData);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            await this.userRepository.deleteUser(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserService = UserService;
