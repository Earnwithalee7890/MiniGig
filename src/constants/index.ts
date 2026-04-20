import { celo, celoAlfajores } from 'wagmi/chains';

export const CONTRACT_ADDRESS = '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b';

export const SUPPORTED_CHAINS = [celo, celoAlfajores];

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/MiniGigApp',
  WEBSITE: 'https://minigig.celo',
  TALENT_APP: 'https://talent.app',
};

export const REWARD_VALUES = {
  CHECK_IN: 10,
  GIG_COMPLETION: 50,
};

export const AVAILABLE_TASKS = [
  { id: '1', title: 'Daily Check-in', reward: '10 Pts', type: 'checkin' },
  { id: 'v', title: 'Verify Proof of Ship', reward: 'Top Priority', type: 'external' },
  { id: '2', title: 'Follow on Farcaster', reward: '50 Pts', type: 'social' },
  { id: '3', title: 'Share MiniGig', reward: '30 Pts', type: 'social' },
] as const;
