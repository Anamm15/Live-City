"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollRepository = void 0;
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
class PollRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPolls(userId) {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPollById(id) {
        try {
            const poll = await this.prisma.polls.findUnique({
                where: { id },
                select: selectedPollFields,
            });
            return poll;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPollVoter(id) {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createPoll(data) {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                const newPoll = await tx.polls.create({
                    data: {
                        shortId: data.shortId,
                        title: data.title,
                        description: data.description,
                        type: data.type,
                        status: data.status,
                    },
                    select: selectedPollFields,
                });
                await tx.pollOptions.createMany({
                    data: data.pollOptions.map((option) => ({
                        ...option,
                        pollId: newPoll.id,
                    })),
                });
                return newPoll;
            });
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async votesPoll(data) {
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
                }
                else {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteVotePoll(pollId, userId) {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updatePoll(id, data) {
        try {
            const updatedPoll = await this.prisma.polls.update({
                where: { id },
                data,
            });
            return updatedPoll;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deletePoll(id) {
        try {
            await this.prisma.polls.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async incremenetCountVote(pollOptionId) {
        try {
            await this.prisma.pollOptions.update({
                where: { id: pollOptionId },
                data: {
                    voteCount: {
                        increment: 1,
                    },
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async decrementCountVote(id) {
        try {
            await this.prisma.pollOptions.update({
                where: { id },
                data: {
                    voteCount: {
                        decrement: 1,
                    },
                },
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.PollRepository = PollRepository;
