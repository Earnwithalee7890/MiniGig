import { createPublicClient, http, parseAbi, Address } from 'viem';
import { celo } from 'viem/chains';

export const DAILY_ACTIVITY_ABI = [
  'function activityCount(address) view returns (uint256)',
  'function getActivityData(address user) view returns (uint256, uint256)',
  'function heartbeat() nonpayable',
  'function lastActivity(address) view returns (uint256)',
  'function recordActivity(string activityType) nonpayable',
  'event ActivityRecorded(address indexed user, uint256 timestamp, string activityType)',
] as const;

export const CONTRACTS = {
  MINI_GIG_CORE: '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b' as Address,
  DAILY_ACTIVITY: '0x35a0b74Fe0551dAcb731c7262bb79018BAF18fcF' as Address,
} as const;

export interface TalentProfile {
  score: number;
  passport_id: string;
  verified: boolean;
}

export class MiniGigSDK {
  private client;

  constructor(rpcUrl: string = 'https://forno.celo.org') {
    this.client = createPublicClient({
      chain: celo,
      transport: http(rpcUrl),
    });
  }

  /**
   * Get the activity count for a user
   */
  async getUserActivityCount(address: Address) {
    return await this.client.readContract({
      address: CONTRACTS.DAILY_ACTIVITY,
      abi: parseAbi(DAILY_ACTIVITY_ABI as any),
      functionName: 'activityCount',
      args: [address],
    });
  }

  /**
   * Get Talent Protocol Builder Score for an address
   * (Uses the Talent Protocol API)
   */
  async getTalentScore(address: Address): Promise<number> {
    try {
      const response = await fetch(`https://api.talentprotocol.com/api/v1/passports/${address}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      return data?.passport?.score || 0;
    } catch (error) {
      console.error('Error fetching Talent Protocol score:', error);
      return 0;
    }
  }

  /**
   * Check if a user is "Top Talent" (Score > 50)
   */
  async isTopTalent(address: Address): Promise<boolean> {
    const score = await this.getTalentScore(address);
    return score > 50;
  }
}

export default MiniGigSDK;
