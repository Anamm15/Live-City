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
      this.router.get('/', authMiddleware, this.pollController.getPolls.bind(this.pollController));
   }

   public getRoutes() {
      return this.router;
   }
}