// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DailyActivity
 * @dev A simple contract for recording daily user interactions on Celo.
 */
contract DailyActivity is ReentrancyGuard {
    mapping(address => uint256) public lastActivity;
    mapping(address => uint256) public activityCount;
    
    event ActivityRecorded(address indexed user, uint256 timestamp, string activityType);
    event StreakUpdated(address indexed user, uint256 newCount);

    /**
     * @dev Internal function to update activity data for a user.
     * @param user The address of the user.
     * @param activityType A string describing the activity.
     */
    function _updateActivity(address user, string memory activityType) internal {
        lastActivity[user] = block.timestamp;
        activityCount[user]++;
        emit ActivityRecorded(user, block.timestamp, activityType);
        emit StreakUpdated(user, activityCount[user]);
    }

    /**
     * @dev Records a generic activity for the sender.
     * @param activityType A string describing the activity (e.g., "Daily Check-in", "Content View").
     */
    function recordActivity(string calldata activityType) external nonReentrant {
        _updateActivity(msg.sender, activityType);
    }

    /**
     * @dev Simple heartbeat function for low-cost daily transactions.
     */
    function heartbeat() external nonReentrant {
        _updateActivity(msg.sender, "Heartbeat");
    }

    /**
     * @dev Returns the activity data for a specific user.
     */
    function getActivityData(address user) external view returns (uint256, uint256) {
        return (lastActivity[user], activityCount[user]);
    }
}
