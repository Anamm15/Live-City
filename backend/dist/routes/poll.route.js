"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollRoutes = void 0;
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
class PollRoutes {
    constructor(pollController) {
        this.router = (0, express_1.Router)();
        this.pollController = pollController;
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get("/", authentication_1.default, this.pollController.getPolls.bind(this.pollController));
        this.router.get("/:id", authentication_1.default, this.pollController.getPollById.bind(this.pollController));
        this.router.get("/voter", authentication_1.default, this.pollController.getPollVoter.bind(this.pollController));
        this.router.post("/", authentication_1.default, this.pollController.createPoll.bind(this.pollController));
        this.router.patch("/:id", authentication_1.default, this.pollController.updatePoll.bind(this.pollController));
        this.router.delete("/:id", authentication_1.default, this.pollController.deletePoll.bind(this.pollController));
        this.router.post("/:id/votes", authentication_1.default, this.pollController.votesPoll.bind(this.pollController));
        this.router.delete("/:id/votes", authentication_1.default, this.pollController.deleteVotePoll.bind(this.pollController));
    }
    getRoutes() {
        return this.router;
    }
}
exports.PollRoutes = PollRoutes;
