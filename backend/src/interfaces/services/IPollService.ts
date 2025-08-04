import { 
   CreatePollRequest, 
   CreateVoteRequest, 
   PollResponse, 
   pollVoter, 
   UpdatePollRequest,
   VoteResponse, } 
from "../../dto/poll.dto";

export interface IPollService {
   getPolls(): Promise<PollResponse[]>;
   getPollById(id: number): Promise<PollResponse>;
   getPollVoter(id: number): Promise<pollVoter[]>;
   createPoll(data: CreatePollRequest): Promise<PollResponse>;
   votesPoll(data: CreateVoteRequest): Promise<VoteResponse>;
   updatePoll(id: number, data: UpdatePollRequest): Promise<PollResponse>;
   deletePoll(id: number): Promise<void>;
}