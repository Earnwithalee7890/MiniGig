// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DailyActivity
 * @dev A simple contract for recording daily user interactions on Celo.
 */
contract DailyActivity {
    mapping(address => uint256) public lastActivity;
    mapping(address => uint256) public activityCount;
    
    event ActivityRecorded(address indexed user, uint256 timestamp, string activityType);

    /**
     * @dev Records a generic activity for the sender.
     * @param activityType A string describing the activity (e.g., "Daily Check-in", "Content View").
     */
    function recordActivity(string calldata activityType) external {
        lastActivity[msg.sender] = block.timestamp;
        activityCount[msg.sender]++;
        
        emit ActivityRecorded(msg.sender, block.timestamp, activityType);
    }

    /**
     * @dev Simple heartbeat function for low-cost daily transactions.
     */
    function heartbeat() external {
        lastActivity[msg.sender] = block.timestamp;
        activityCount[msg.sender]++;
        
        emit ActivityRecorded(msg.sender, block.timestamp, "Heartbeat");
    }

    /**
     * @dev Returns the activity data for a specific user.
     */
    function getActivityData(address user) external view returns (uint256, uint256) {
        return (lastActivity[user], activityCount[user]);
    }
}
