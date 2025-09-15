"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyService = void 0;
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
class FamilyService {
    constructor(familyRepository) {
        this.familyRepository = familyRepository;
    }
    async getFamilies() {
        try {
            return this.familyRepository.getFamilies();
        }
        catch (error) {
            throw error;
        }
    }
    async getFamilyWithMembers(id) {
        try {
            const families = await this.familyRepository.getFamilyWithMembers(id);
            if (!families) {
                throw new errors_1.NotFoundError(message_constants_1.FamilyMessage.FAMILY_NOT_FOUND);
            }
            return families;
        }
        catch (error) {
            throw error;
        }
    }
    async createFamily(family) {
        try {
            return this.familyRepository.createFamily(family);
        }
        catch (error) {
            throw error;
        }
    }
    async updateFamily(id, family) {
        try {
            return this.familyRepository.updateFamily(id, family);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFamily(id) {
        try {
            await this.familyRepository.deleteFamily(id);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.FamilyService = FamilyService;
