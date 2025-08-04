import { Request, Response, NextFunction } from "express";

export interface IPollController {
   getPolls(req: Request, res: Response, next: NextFunction): Promise<void>;
   getPollById(req: Request, res: Response, next: NextFunction): Promise<void>;
   getPollVoter(req: Request, res: Response, next: NextFunction): Promise<void>;
   createPoll(req: Request, res: Response, next: NextFunction): Promise<void>;
   votesPoll(req: Request, res: Response, next: NextFunction): Promise<void>;
   updatePoll(req: Request, res: Response, next: NextFunction): Promise<void>;
   deletePoll(req: Request, res: Response, next: NextFunction): Promise<void>;
}