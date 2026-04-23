import { expect } from "chai";
import { ethers } from "hardhat";

describe("DailyActivity", function () {
  async function deployContract() {
    const DailyActivity = await ethers.getContractFactory("DailyActivity");
    const dailyActivity = await DailyActivity.deploy();
    return { dailyActivity };
  }

  it("Should record activity", async function () {
    const { dailyActivity } = await deployContract();
    const [owner] = await ethers.getSigners();

    await dailyActivity.recordActivity("Test Activity");
    const [lastActivity, count] = await dailyActivity.getActivityData(owner.address);

    expect(count).to.equal(1);
    expect(lastActivity).to.be.gt(0);
  });

  it("Should record heartbeat", async function () {
    const { dailyActivity } = await deployContract();
    const [owner] = await ethers.getSigners();

    await dailyActivity.heartbeat();
    const [lastActivity, count] = await dailyActivity.getActivityData(owner.address);

    expect(count).to.equal(1);
  });
});
