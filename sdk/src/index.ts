import { createPublicClient, http, parseAbi, Address, Chain } from 'viem';
import { celo, celoAlfajores } from 'viem/chains';
import { DAILY_ACTIVITY_ABI, CONTRACTS, CONTRACTS_ALFAJORES, ENDPOINTS } from './constants';
import { TalentProfile, TalentPassport, TalentPassportResponse } from './types';
import { isValidAddress } from './utils';

/**
 * Custom error class for Talent Protocol API issues
 */
export class TalentProtocolError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'TalentProtocolError';
  }
}


export * from './types';
export * from './constants';
export * from './utils';


/**
 * Main SDK class for interacting with MiniGig contracts and Talent Protocol
 */
export class MiniGigSDK {
  private client;
  private contracts;

  /**
   * Initialize the MiniGig SDK
   * @param rpcUrl The Celo RPC URL (defaults to Celo Forno)
   * @param chain The viem Chain object (defaults to celo)
   */
  constructor(rpcUrl: string = 'https://forno.celo.org', chain: Chain = celo) {
    this.client = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });
    this.contracts = chain.id === celoAlfajores.id ? CONTRACTS_ALFAJORES : CONTRACTS;
  }

  /**
   * Get the total activity count for a specific user
   * @param address The Celo address of the user
   * @returns The number of recorded activities
   */
  async getUserActivityCount(address: Address) {
    return await this.client.readContract({
      address: this.contracts.DAILY_ACTIVITY,
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
      address: this.contracts.DAILY_ACTIVITY,
      abi: parseAbi(DAILY_ACTIVITY_ABI as any),
      functionName: 'getActivityData',
      args: [address],
    });
  }

  /**
   * Send a heartbeat to the DailyActivity contract.
   * This is used to maintain the user's active status.
   * Note: This requires a wallet client (not just public client) to send a transaction.
   * @returns The transaction parameters for use with a wallet
   */
  getHeartbeatRequest() {
    return {
      address: this.contracts.DAILY_ACTIVITY,
      abi: parseAbi(DAILY_ACTIVITY_ABI as any),
      functionName: 'heartbeat',
    };
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
      
      if (response.status === 404) return null;
      if (!response.ok) {
        throw new TalentProtocolError(`Failed to fetch passport: ${response.statusText}`, response.status);
      }
      
      const data: TalentPassportResponse = await response.json();
      return data?.passport || null;
    } catch (error) {
      if (error instanceof TalentProtocolError) throw error;
      console.error('Error fetching Talent Protocol passport:', error);
      throw new TalentProtocolError(error instanceof Error ? error.message : 'Unknown error');
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
