export const MINI_GIG_CORE_ADDRESS = '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b';
export const DAILY_ACTIVITY_ADDRESS = '0x35a0b74Fe0551dAcb731c7262bb79018BAF18fcF';

export const MINI_GIG_ABI = [
  "function checkIn() nonpayable",
  "function completeGig(bytes32 taskId) nonpayable",
  "function getUserStats(address user) view returns (uint256 lastCheckIn, uint256 streak, uint256 totalGigs, uint256 totalXP)",
  "function owner() view returns (address)",
  "event CheckedIn(address indexed user, uint256 timestamp, uint256 streak)",
  "event GigCompleted(address indexed user, bytes32 indexed taskId, uint256 xpEarned)"
] as const;

export const DAILY_ACTIVITY_ABI = [
  "function activityCount(address) view returns (uint256)",
  "function getActivityData(address user) view returns (uint256, uint256)",
  "function heartbeat() nonpayable",
  "function lastActivity(address) view returns (uint256)",
  "function recordActivity(string activityType) nonpayable",
  "event ActivityRecorded(address indexed user, uint256 timestamp, string activityType)"
] as const;

/**
 * Talent Protocol Integration Metadata
 */
export const TALENT_PROTOCOL_CONFIG = {
  verificationTag: 'talentapp:project_verification',
  scoreEndpoint: 'https://api.talentprotocol.com/api/v1/passports/',
  requirements: [
    'builders-score',
    'verified-identity'
  ]
};
