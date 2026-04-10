export const MINIGIG_ABI = [
  {
    "inputs": [],
    "name": "checkIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "lastCheckIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "streak",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalGigs",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewards",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      }
    ],
    "name": "completeGig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "taskId",
        "type": "bytes32"
      }
    ],
    "name": "hasCompletedTask",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
