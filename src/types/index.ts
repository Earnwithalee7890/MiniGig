import React from 'react';

export type TaskType = 'checkin' | 'external' | 'social';

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
  type: TaskType;
  icon?: React.ReactNode;
}

export interface ActivityData {
  timestamp: bigint;
  activityType: string;
}

export interface TransactionResponse {
  hash: string;
  from: string;
  to: string;
  timestamp?: number;
}
