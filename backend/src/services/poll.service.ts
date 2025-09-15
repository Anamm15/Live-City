import { IPollRepository } from "../interfaces/repositories/IPollRepository";
import { IPollService } from "../interfaces/services/IPollService";
import {
  CreatePollRequest,
  CreateVoteRequest,
  PollResponse,
  pollVoter,
  UpdatePollRequest,
  VoteResponse,
} from "../dto/poll.dto";
import { generateUUIDWithPrefix } from "../utils/uuid";
import { PrefixType } from "../helpers/app.constants";

export class PollService implements IPollService {
  private pollRepository: IPollRepository;

  constructor(pollRepository: IPollRepository) {
    this.pollRepository = pollRepository;
  }

  async getPolls(userId: number): Promise<PollResponse[]> {
    try {
      const polls = await this.pollRepository.getPolls(userId);
      if (polls.length === 0) {
        throw new Error("No polls found");
      }
      return polls;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPollById(id: number): Promise<PollResponse> {
    try {
      const poll = await this.pollRepository.getPollById(id);
      if (!poll) {
        throw new Error("Poll not found");
      }
      return poll;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPollVoter(id: number): Promise<pollVoter[]> {
    try {
      const voters = await this.pollRepository.getPollVoter(id);
      if (voters.length === 0) {
        throw new Error("No voters found");
      }
      return voters;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createPoll(poll: CreatePollRequest): Promise<PollResponse> {
    try {
      const shortId = generateUUIDWithPrefix(PrefixType.POllS);
      poll.shortId = shortId;
      return this.pollRepository.createPoll(poll);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async votesPoll(
    data: CreateVoteRequest,
    userId: number
  ): Promise<VoteResponse> {
    try {
      data.userId = userId;
      return this.pollRepository.votesPoll(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteVotePoll(pollId: number, userId: number): Promise<void> {
    try {
      return this.pollRepository.deleteVotePoll(pollId, userId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updatePoll(id: number, poll: UpdatePollRequest): Promise<PollResponse> {
    try {
      return this.pollRepository.updatePoll(id, poll);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deletePoll(id: number): Promise<void> {
    try {
      return this.pollRepository.deletePoll(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
