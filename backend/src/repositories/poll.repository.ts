import { 
   CreatePollRequest, 
   CreateVoteRequest, 
   PollResponse, 
   pollVoter, 
   UpdatePollRequest, 
   VoteResponse 
} from "../dto/poll.dto";
import { PrismaClient } from "../generated/prisma";
import { IPollRepository } from "../interfaces/repositories/IPollRepository";

const selectedPollFields = {
   id: true,
   title: true,
   description: true,
   type: true,
   status: true,
   pollOptions: {
      select: {
         id: true,
         label: true,
         voteCount: true
      }
   }
}

export class PollRepository implements IPollRepository {
   private prisma: PrismaClient;

   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }

   async getPolls(): Promise<PollResponse[]> {
      try {
         const polls = await this.prisma.polls.findMany({
            select: selectedPollFields
         });
         return polls;
      } catch (error: any) {
         throw new Error(error.message);
      }    
   }

   async getPollById(id: number): Promise<PollResponse | null> {
      try {
         const poll = await this.prisma.polls.findUnique({
            where: { id },
            select: selectedPollFields
         });
         return poll;
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async getPollVoter(id: number): Promise<pollVoter[]> {
      try {
         const voters = await this.prisma.pollVotes.findMany({
            where: {
               option: {
                  pollId: id
               }
            },
            select: {
               id: true,
               user: {
                  select: {
                     id: true,
                     name: true
                  }
               },
            },
         });
         return voters;
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async createPoll(data: CreatePollRequest): Promise<PollResponse> {
      try {
         const newPoll = await this.prisma.polls.create({
            data
         });
         return newPoll;
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async votesPoll(data: CreateVoteRequest): Promise<VoteResponse> {
      try {
         const newVote = await this.prisma.pollVotes.create({
            data
         });
         return newVote;
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async updatePoll(id: number, data: UpdatePollRequest): Promise<PollResponse> {
      try {
         const updatedPoll = await this.prisma.polls.update({
            where: { id },
            data
         });
         return updatedPoll;
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async deletePoll(id: number): Promise<void> {
      try {
         await this.prisma.polls.delete({
            where: { id }
         });
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async incremenetCountVote(pollOptionId: number): Promise<void> {
      try {
         await this.prisma.pollOptions.update({
            where: { id: pollOptionId },
            data: {
               voteCount: {
                  increment: 1
               }
            }
         });
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }

   async decrementCountVote(id: number): Promise<void> {
      try {
         await this.prisma.pollOptions.update({
            where: { id },
            data: {
               voteCount: {
                  decrement: 1
               }
            }
         });
      } catch (error: any) {
         throw new Error(error.message);
      } 
   }
}