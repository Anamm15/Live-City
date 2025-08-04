import { IPollController } from "../interfaces/controllers/IPollController";
import { IPollService } from "../interfaces/services/IPollService";
import { Request, Response, NextFunction } from "express";
import { buildResponseError, buildResponseSuccess } from "../utils/response";
import { PollsMessage } from "../helpers/message.constants";

export class PollController implements IPollController {
   private pollService: IPollService;

   constructor(pollService: IPollService) {
      this.pollService = pollService;
   }

   async getPolls(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const results = await this.pollService.getPolls();
         res.status(200).send(buildResponseSuccess(results, PollsMessage.POLL_RETRIEVED));
      } catch (error: any) {
         res.status(500).send(buildResponseError(error.message, PollsMessage.POLL_RETRIEVE_FAILED));
      }
   }

   async getPollById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const pollId = parseInt(req.params.id, 10);
         if (isNaN(pollId)) {
            throw new Error("Invalid poll id");
         }
         const result = await this.pollService.getPollById(pollId);
         res.status(200).send(buildResponseSuccess(result, PollsMessage.POLL_RETRIEVED));
       } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_RETRIEVE_FAILED));
       }
   }

   async getPollVoter(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const pollId = parseInt(req.params.id, 10);
         if (isNaN(pollId)) {
            throw new Error("Invalid poll id");
         }
         const result = await this.pollService.getPollVoter(pollId);
         res.status(200).send(buildResponseSuccess(result, PollsMessage.POLL_RETRIEVED));
      } catch (error: any) {
      res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_RETRIEVE_FAILED));
      }
   }

   async createPoll(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.pollService.createPoll(req.body);
         res.status(201).send(buildResponseSuccess(result, PollsMessage.POLL_CREATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_CREATE_FAILED));
      }
   }

   async votesPoll(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const result = await this.pollService.votesPoll(req.body);
         res.status(201).send(buildResponseSuccess(result, PollsMessage.POLL_VOTED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_VOTE_FAILED));
      }
   }

   async updatePoll(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const pollId = parseInt(req.params.id, 10);
         if (isNaN(pollId)) {
            throw new Error("Invalid poll id");
         }
         const result = await this.pollService.updatePoll(pollId, req.body);
         res.status(200).send(buildResponseSuccess(result, PollsMessage.POLL_UPDATED));
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_UPDATE_FAILED));
      }
   }

   async deletePoll(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const pollId = parseInt(req.params.id, 10);
         if (isNaN(pollId)) {
            throw new Error("Invalid poll id");
         }
         await this.pollService.deletePoll(pollId);
         res.status(204).send();
      } catch (error: any) {
         res.status(400).send(buildResponseError(error.message, PollsMessage.POLL_DELETE_FAILED));         
      }
   }
}