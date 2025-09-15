import { Reward } from "../../dto/reward.dto";

export interface IRewardRepository {
  getRewards(): Promise<Reward[]>;
  getRewardsByUserId(userId: string): Promise<Reward[]>;
  createReward(reward: Reward): Promise<Reward>;
}
