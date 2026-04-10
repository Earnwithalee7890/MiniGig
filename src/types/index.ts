export interface UserStats {
  lastCheckIn: bigint;
  streak: bigint;
  totalGigs: bigint;
  rewards: bigint;
}

export interface Task {
  id: string;
  title: string;
  reward: string;
  icon: React.ReactNode;
}
