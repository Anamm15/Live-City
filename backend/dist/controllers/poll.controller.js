"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollController = void 0;
const response_1 = require("../utils/response");
const message_constants_1 = require("../helpers/message.constants");
const errors_1 = require("../utils/errors");
class PollController {
    constructor(pollService) {
        this.pollService = pollService;
    }
    async getPolls(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                throw new errors_1.BadRequestError("Invalid user id");
            }
            const results = await this.pollService.getPolls(userId);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)(results, message_constants_1.PollsMessage.POLL_RETRIEVED));
        }
        catch (error) {
            res
                .status(500)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_RETRIEVE_FAILED));
        }
    }
    async getPollById(req, res, next) {
        try {
            const pollId = parseInt(req.params.id, 10);
            if (isNaN(pollId)) {
                throw new Error("Invalid poll id");
            }
            const result = await this.pollService.getPollById(pollId);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_RETRIEVED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_RETRIEVE_FAILED));
        }
    }
    async getPollVoter(req, res, next) {
        try {
            const pollId = parseInt(req.params.id, 10);
            if (isNaN(pollId)) {
                throw new Error("Invalid poll id");
            }
            const result = await this.pollService.getPollVoter(pollId);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_RETRIEVED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_RETRIEVE_FAILED));
        }
    }
    async createPoll(req, res, next) {
        try {
            const result = await this.pollService.createPoll(req.body);
            res
                .status(201)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_CREATED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_CREATE_FAILED));
        }
    }
    async votesPoll(req, res, next) {
        try {
            let userId = req.user?.id;
            const pollIdParam = req.params.id;
            if (!userId) {
                throw new errors_1.BadRequestError("Invalid user id");
            }
            if (!pollIdParam) {
                throw new errors_1.BadRequestError("Invalid poll id");
            }
            let pollId = parseInt(pollIdParam, 10);
            const result = await this.pollService.votesPoll({ ...req.body, pollId }, userId);
            res
                .status(201)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_VOTED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_VOTE_FAILED));
        }
    }
    async deleteVotePoll(req, res, next) {
        try {
            let userId = req.user?.id;
            const pollIdParam = req.params.id;
            if (!userId) {
                throw new errors_1.BadRequestError("Invalid user id");
            }
            if (!pollIdParam) {
                throw new errors_1.BadRequestError("Invalid poll id");
            }
            let pollId = parseInt(pollIdParam, 10);
            const result = await this.pollService.deleteVotePoll(pollId, userId);
            res
                .status(201)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_VOTED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_VOTE_FAILED));
        }
    }
    async updatePoll(req, res, next) {
        try {
            const pollId = parseInt(req.params.id, 10);
            if (isNaN(pollId)) {
                throw new Error("Invalid poll id");
            }
            const result = await this.pollService.updatePoll(pollId, req.body);
            res
                .status(200)
                .send((0, response_1.buildResponseSuccess)(result, message_constants_1.PollsMessage.POLL_UPDATED));
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_UPDATE_FAILED));
        }
    }
    async deletePoll(req, res, next) {
        try {
            const pollId = parseInt(req.params.id, 10);
            if (isNaN(pollId)) {
                throw new Error("Invalid poll id");
            }
            await this.pollService.deletePoll(pollId);
            res.status(204).send();
        }
        catch (error) {
            res
                .status(400)
                .send((0, response_1.buildResponseError)(error.message, message_constants_1.PollsMessage.POLL_DELETE_FAILED));
        }
    }
}
exports.PollController = PollController;
