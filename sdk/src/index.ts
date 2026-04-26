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

/**
 * Represents a user profile from Talent Protocol
 */
export interface TalentProfile {
  /** The builder score (0-100) */
  score: number;
  /** The unique passport ID */
  passport_id: string;
  /** Whether the user is identity verified */
  verified: boolean;
}

/**
 * Main SDK class for interacting with MiniGig contracts and Talent Protocol
 */
export class MiniGigSDK {
  private client;

  /**
   * Initialize the MiniGig SDK
   * @param rpcUrl The Celo RPC URL (defaults to Celo Forno)
   */
  constructor(rpcUrl: string = 'https://forno.celo.org') {
    this.client = createPublicClient({
      chain: celo,
      transport: http(rpcUrl),
    });
  }

  /**
   * Get the total activity count for a specific user
   * @param address The Celo address of the user
   * @returns The number of recorded activities
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
   * Get full activity data for a user (count and last timestamp)
   * @param address The Celo address of the user
   * @returns A tuple containing [activityCount, lastTimestamp]
   */
  async getUserActivityData(address: Address) {
    return await this.client.readContract({
      address: CONTRACTS.DAILY_ACTIVITY,
      abi: parseAbi(DAILY_ACTIVITY_ABI as any),
      functionName: 'getActivityData',
      args: [address],
    });
  }

  /**
   * Fetch the Talent Protocol Builder Score for a specific address
   * This score represents the user's reputation based on on-chain and off-chain data.
   * 
   * @param address The Celo address to check
   * @returns The Builder Score (0-100)
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
   * Check if a user qualifies as "Top Talent" based on their Builder Score.
   * Currently defined as having a score greater than 50.
   * 
   * @param address The Celo address of the user
   * @returns True if the user is Top Talent, false otherwise
   */
  async isTopTalent(address: Address): Promise<boolean> {
    const score = await this.getTalentScore(address);
    return score > 50;
  }
}

export default MiniGigSDK;
