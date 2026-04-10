import { CONTRACT_ADDRESS, SOCIAL_LINKS, REWARD_VALUES } from '../constants';

export const useAppConstants = () => {
  return {
    contractAddress: CONTRACT_ADDRESS,
    socialLinks: SOCIAL_LINKS,
    rewardValues: REWARD_VALUES,
  };
};
