export const MINIGIG_ABI = [
  {
    "type": "function",
    "name": "checkIn",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "completeGig",
    "inputs": [{ "name": "gigId", "type": "bytes32" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getUserStats",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [
      { "name": "lastCheckIn", "type": "uint256" },
      { "name": "streak", "type": "uint256" },
      { "name": "totalGigs", "type": "uint256" },
      { "name": "rewards", "type": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "CheckIn",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true },
      { "name": "timestamp", "type": "uint256", "indexed": false },
      { "name": "streak", "type": "uint256", "indexed": false }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "GigCompleted",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true },
      { "name": "gigId", "type": "bytes32", "indexed": true },
      { "name": "reward", "type": "uint256", "indexed": false }
    ],
    "anonymous": false
  }
] as const;

export const DAILY_ACTIVITY_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "activityType", "type": "string" }
    ],
    "name": "ActivityRecorded",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getActivityData",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "heartbeat",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "activityType", "type": "string" }
    ],
    "name": "recordActivity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

