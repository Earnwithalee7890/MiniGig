export const MINI_GIG_ABI = [
  "function checkIn() nonpayable",
  "function completeGig(bytes32 taskId) nonpayable",
  "function getUserStats(address user) view returns (uint256 lastCheckIn, uint256 streak, uint256 totalGigs, uint256 totalXP)",
  "function owner() view returns (address)",
  "event CheckedIn(address indexed user, uint256 timestamp, uint256 streak)",
  "event GigCompleted(address indexed user, bytes32 indexed taskId, uint256 xpEarned)"
] as const;
