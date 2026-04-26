import { createPublicClient, http, parseAbi, Address } from 'viem';
import { celo } from 'viem/chains';
import { DAILY_ACTIVITY_ABI, CONTRACTS, ENDPOINTS } from './constants';
import { TalentProfile, TalentPassport, TalentPassportResponse } from './types';
import { isValidAddress } from './utils';

export * from './types';
export * from './constants';
export * from './utils';


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
   * Fetch the full Talent Protocol Passport for a specific address.
   * 
   * @param address The Celo address to check
   * @returns The full passport data or null if not found
   */
  async getTalentPassport(address: Address): Promise<TalentPassport | null> {
    try {
      const response = await fetch(`${ENDPOINTS.TALENT_PROTOCOL_API}/passports/${address}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) return null;
      
      const data: TalentPassportResponse = await response.json();
      return data?.passport || null;
    } catch (error) {
      console.error('Error fetching Talent Protocol passport:', error);
      return null;
    }
  }

  /**
   * Fetch the Talent Protocol Builder Score for a specific address.
   * 
   * @param address The Celo address to check
   * @returns The Builder Score (0-100)
   */
  async getTalentScore(address: Address): Promise<number> {
    const passport = await this.getTalentPassport(address);
    return passport?.score || 0;
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
