import { Address } from 'viem';

/**
 * ABI for the DailyActivity contract
 */
export const DAILY_ACTIVITY_ABI = [
  'function activityCount(address) view returns (uint256)',
  'function getActivityData(address user) view returns (uint256, uint256)',
  'function heartbeat() nonpayable',
  'function lastActivity(address) view returns (uint256)',
  'function recordActivity(string activityType) nonpayable',
  'event ActivityRecorded(address indexed user, uint256 timestamp, string activityType)',
] as const;

/**
 * Deployed contract addresses on Celo
 */
export const CONTRACTS = {
  /** Main MiniGig Core contract */
  MINI_GIG_CORE: '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b' as Address,
  /** Daily Activity tracking contract */
  DAILY_ACTIVITY: '0x35a0b74Fe0551dAcb731c7262bb79018BAF18fcF' as Address,
} as const;

/**
 * External API Endpoints
 */
export const ENDPOINTS = {
  TALENT_PROTOCOL_API: 'https://api.talentprotocol.com/api/v1',
} as const;
