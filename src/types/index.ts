/**
 * Represents a wallet's on-chain stats.
 */
export interface WalletStats {
  lastCheckIn: bigint;
  streak: bigint;
  totalGigs: bigint;
  rewards: bigint;
}

/**
 * Represents a available gig task.
 */
export interface GigTask {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  icon?: string;
}
