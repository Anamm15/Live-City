import { PollsType, PollsStatus } from "../generated/prisma";

export type pollVoter = {
  id: number;
  user: {
    id: number;
    name: string;
  };
};

export type PollOption = {
  id: number;
  label: string;
  voteCount: number;
};

export type PollResponse = {
  shortId: string;
  title: string;
  description: string;
  type: PollsType;
  status: PollsStatus;
  pollOptions?: PollOption[];
};

export type VoteResponse = {
  id: number;
  pollOptionId: number;
  userId: number;
};

export type CreatePollRequest = {
  title: string;
  shortId: string;
  description: string;
  type: PollsType;
  status: PollsStatus;
  pollOptions: { label: string }[];
};

export type UpdatePollRequest = {
  title?: string;
  description?: string;
  type?: PollsType;
  status?: PollsStatus;
};

export type CreateVoteRequest = {
  pollId: number;
  pollOptionId: number;
  userId: number;
};
