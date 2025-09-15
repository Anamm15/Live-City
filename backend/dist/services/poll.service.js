"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollService = void 0;
const uuid_1 = require("../utils/uuid");
const app_constants_1 = require("../helpers/app.constants");
class PollService {
    constructor(pollRepository) {
        this.pollRepository = pollRepository;
    }
    async getPolls(userId) {
        try {
            const polls = await this.pollRepository.getPolls(userId);
            if (polls.length === 0) {
                throw new Error("No polls found");
            }
            return polls;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPollById(id) {
        try {
            const poll = await this.pollRepository.getPollById(id);
            if (!poll) {
                throw new Error("Poll not found");
            }
            return poll;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPollVoter(id) {
        try {
            const voters = await this.pollRepository.getPollVoter(id);
            if (voters.length === 0) {
                throw new Error("No voters found");
            }
            return voters;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createPoll(poll) {
        try {
            const shortId = (0, uuid_1.generateUUIDWithPrefix)(app_constants_1.PrefixType.POllS);
            poll.shortId = shortId;
            return this.pollRepository.createPoll(poll);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async votesPoll(data, userId) {
        try {
            data.userId = userId;
            return this.pollRepository.votesPoll(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteVotePoll(pollId, userId) {
        try {
            return this.pollRepository.deleteVotePoll(pollId, userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updatePoll(id, poll) {
        try {
            return this.pollRepository.updatePoll(id, poll);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deletePoll(id) {
        try {
            return this.pollRepository.deletePoll(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.PollService = PollService;
