// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MiniGig
 * @dev A task and check-in system for Celo Proof of Ship (MiniPay)
 */
contract MiniGig is Ownable {
    string public constant VERSION = "1.0.0";

    struct Wallet {
        uint256 lastCheckIn; // The timestamp of the last check-in.
        uint256 streak; // Current streak of consecutive daily check-ins.
        uint256 totalGigs; // Total number of tasks/gigs completed.
        uint256 rewards; // Total reward points earned by the wallet.
    }

    /// @notice Tracks user stats for each wallet address
    mapping(address => Wallet) public wallets;
    /// @notice Tracks completed tasks by hashing the user address and task ID
    mapping(bytes32 => bool) public completedTasks;

    /// @notice Emitted when a user successfully checks in
    event CheckedIn(address indexed user, uint256 timestamp, uint256 streak);
    /// @notice Emitted when a user completes a specific task
    event TaskCompleted(address indexed user, bytes32 indexed taskId, uint256 reward);
    /// @notice Emitted when a user claims rewards (for future implementation)
    event RewardClaimed(address indexed user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Daily check-in logic. Users can check in once every 24 hours.
     * Streaks are maintained if the user checks in within 48 hours of their last check-in.
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
     * Each task is uniquely identified by its taskId for the caller.
     */
    function completeGig(bytes32 taskId) external {
        // Hash task and sender for unique completion record
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
