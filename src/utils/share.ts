import { shareContent } from './helpers';
import { SHARE_MESSAGES } from '../constants';

/**
 * Shares the user's progress or activity to social media.
 * @param activityType - The type of activity being shared.
 * @returns A promise that resolves to true if successful.
 */
export const shareUserActivity = async (activityType: string): Promise<boolean> => {
  const title = `MiniGig | ${activityType}`;
  const text = `I just completed a ${activityType} on MiniGig! Join me on Celo and earn rewards.`;
  return await shareContent(title, text, SHARE_MESSAGES.URL);
};
