import {
  CreatePollRequest,
  CreateVoteRequest,
  PollResponse,
  pollVoter,
  UpdatePollRequest,
  VoteResponse,
} from "../dto/poll.dto";
import { PrismaClient } from "@prisma/client";
import { IPollRepository } from "../interfaces/repositories/IPollRepository";
import {
  mapCreatePollRequest,
  mapUpdatePollRequest,
} from "../utils/prisma-adapter";

const selectedPollFields = {
  id: true,
  shortId: true,
  title: true,
  description: true,
  type: true,
  status: true,
  options: {
    select: {
      id: true,
      label: true,
      voteCount: true,
    },
  },
};

export class PollRepository implements IPollRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getPolls(userId: number): Promise<any[]> {
    try {
      const polls = await this.prisma.polls.findMany({
        select: {
          ...selectedPollFields,
          votes: {
            where: { userId },
            select: { pollOptionId: true },
          },
        },
        orderBy: { id: "desc" },
      });

      return polls.map((poll) => ({
        ...poll,
        selectedOptionId: poll.votes[0]?.pollOptionId ?? null,
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPollById(id: number): Promise<PollResponse | null> {
    try {
      const poll = await this.prisma.polls.findUnique({
        where: { id },
        select: selectedPollFields,
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
            pollId: id,
          },
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
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
      const prismaData = mapCreatePollRequest(data);

      const newPoll = await this.prisma.polls.create({
        data: prismaData,
        include: { options: true },
      });
      return newPoll;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async votesPoll(data: CreateVoteRequest): Promise<VoteResponse> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingVote = await tx.pollVotes.findUnique({
          where: {
            userId_pollId: {
              userId: data.userId,
              pollId: data.pollId,
            },
          },
        });

        let newVote;

        if (existingVote) {
          newVote = await tx.pollVotes.update({
            where: {
              userId_pollId: {
                userId: data.userId,
                pollId: data.pollId,
              },
            },
            data: {
              pollOptionId: data.pollOptionId,
            },
          });

          await tx.pollOptions.update({
            where: { id: existingVote.pollOptionId },
            data: { voteCount: { decrement: 1 } },
          });

          await tx.pollOptions.update({
            where: { id: data.pollOptionId },
            data: { voteCount: { increment: 1 } },
          });
        } else {
          newVote = await tx.pollVotes.create({
            data: {
              userId: data.userId,
              pollId: data.pollId,
              pollOptionId: data.pollOptionId,
            },
          });

          await tx.pollOptions.update({
            where: { id: data.pollOptionId },
            data: { voteCount: { increment: 1 } },
          });
        }

        return newVote;
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteVotePoll(pollId: number, userId: number): Promise<void> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingVote = await tx.pollVotes.findUnique({
          where: {
            userId_pollId: {
              userId,
              pollId,
            },
          },
        });

        if (!existingVote) {
          throw new Error("Vote not found");
        }

        await tx.pollOptions.update({
          where: { id: existingVote.pollOptionId },
          data: { voteCount: { decrement: 1 } },
        });

        await tx.pollVotes.delete({
          where: {
            userId_pollId: {
              userId,
              pollId,
            },
          },
        });

        return;
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updatePoll(id: number, data: UpdatePollRequest): Promise<PollResponse> {
    try {
      const prismaData = mapUpdatePollRequest(data);

      const updatedPoll = await this.prisma.polls.update({
        where: { id },
        data: prismaData,
        include: { options: true },
      });

      return updatedPoll;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deletePoll(id: number): Promise<void> {
    try {
      await this.prisma.polls.delete({
        where: { id },
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
            increment: 1,
          },
        },
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
            decrement: 1,
          },
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
