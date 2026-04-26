export const DAILY_ACTIVITY_ABI = [
  "function activityCount(address) view returns (uint256)",
  "function getActivityData(address user) view returns (uint256, uint256)",
  "function heartbeat() nonpayable",
  "function lastActivity(address) view returns (uint256)",
  "function recordActivity(string activityType) nonpayable",
  "event ActivityRecorded(address indexed user, uint256 timestamp, string activityType)"
] as const;
