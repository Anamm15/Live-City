import {
  CreatePollRequest,
  CreateVoteRequest,
  PollResponse,
  pollVoter,
  UpdatePollRequest,
  VoteResponse,
} from "../../dto/poll.dto";

export interface IPollRepository {
  getPolls(userId: number): Promise<PollResponse[]>;
  getPollById(id: number): Promise<PollResponse | null>;
  getPollVoter(id: number): Promise<pollVoter[]>;
  createPoll(data: CreatePollRequest): Promise<PollResponse>;
  updatePoll(id: number, data: UpdatePollRequest): Promise<PollResponse>;
  deletePoll(id: number): Promise<void>;
  votesPoll(data: CreateVoteRequest): Promise<VoteResponse>;
  deleteVotePoll(pollId: number, userId: number): Promise<void>;
  incremenetCountVote(pollOptionId: number): Promise<void>;
  decrementCountVote(pollOptionId: number): Promise<void>;
}
