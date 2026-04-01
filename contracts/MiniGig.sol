// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MiniGig
 * @dev A task and check-in system for Celo Proof of Ship (MiniPay)
 */
contract MiniGig is Ownable {
    struct Wallet {
        uint256 lastCheckIn;
        uint256 streak;
        uint256 totalGigs;
        uint256 rewards;
    }

    mapping(address => Wallet) public wallets;
    mapping(bytes32 => bool) public completedTasks;

    event CheckedIn(address indexed user, uint256 timestamp, uint256 streak);
    event TaskCompleted(address indexed user, bytes32 indexed taskId, uint256 reward);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Daily check-in to boost activity metrics for AI agents.
     */
    function checkIn() external {
        Wallet storage user = wallets[msg.sender];
        require(block.timestamp >= user.lastCheckIn + 1 days, "Already checked in today");

        if (block.timestamp <= user.lastCheckIn + 2 days) {
            user.streak += 1;
        } else {
            user.streak = 1;
        }

        user.lastCheckIn = block.timestamp;
        user.rewards += 10; // Virtual reward points

        emit CheckedIn(msg.sender, block.timestamp, user.streak);
    }

    /**
     * @dev Simple task completion to record on-chain activity.
     */
    function completeGig(bytes32 taskId) external {
        bytes32 userTaskId = keccak256(abi.encodePacked(msg.sender, taskId));
        require(!completedTasks[userTaskId], "Gig already completed");

        completedTasks[userTaskId] = true;
        wallets[msg.sender].totalGigs += 1;
        wallets[msg.sender].rewards += 50;

        emit TaskCompleted(msg.sender, taskId, 50);
    }

    function getUserStats(address user) external view returns (uint256 lastCheckIn, uint256 streak, uint256 totalGigs, uint256 rewards) {
        Wallet storage w = wallets[user];
        return (w.lastCheckIn, w.streak, w.totalGigs, w.rewards);
    }
}
