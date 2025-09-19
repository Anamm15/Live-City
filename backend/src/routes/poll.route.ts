import { Router } from "express";
import { IPollController } from "../interfaces/controllers/IPollController";
import authMiddleware from "../middlewares/authentication";

export class PollRoutes {
  private router: Router;
  private pollController: IPollController;

  constructor(pollController: IPollController) {
    this.router = Router();
    this.pollController = pollController;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.get(
      "/",
      authMiddleware,
      this.pollController.getPolls.bind(this.pollController)
    );

    this.router.get(
      "/:id",
      authMiddleware,
      this.pollController.getPollById.bind(this.pollController)
    );

    this.router.get(
      "/voter",
      authMiddleware,
      this.pollController.getPollVoter.bind(this.pollController)
    );

    this.router.post(
      "/",
      authMiddleware,
      this.pollController.createPoll.bind(this.pollController)
    );

    this.router.put(
      "/:id",
      authMiddleware,
      this.pollController.updatePoll.bind(this.pollController)
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      this.pollController.deletePoll.bind(this.pollController)
    );

    this.router.post(
      "/:id/votes",
      authMiddleware,
      this.pollController.votesPoll.bind(this.pollController)
    );

    this.router.delete(
      "/:id/votes",
      authMiddleware,
      this.pollController.deleteVotePoll.bind(this.pollController)
    );
  }

  public getRoutes() {
    return this.router;
  }
}
