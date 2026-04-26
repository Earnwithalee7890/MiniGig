import { Address } from 'viem';

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
 * Detailed passport data from Talent Protocol
 */
export interface TalentPassport {
  id: string;
  main_wallet: Address;
  score: number;
  verified: boolean;
  activity_score: number;
  identity_score: number;
  skills_score: number;
}

/**
 * Response structure from the Talent Protocol API
 */
export interface TalentPassportResponse {
  passport: TalentPassport;
}
