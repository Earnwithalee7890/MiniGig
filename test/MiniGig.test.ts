import { expect } from "chai";
import { ethers } from "hardhat";

describe("MiniGig", function () {
  it("Should set the right owner", async function () {
    const [owner] = await ethers.getSigners();
    const MiniGig = await ethers.getContractFactory("MiniGig");
    const minigig = await MiniGig.deploy();
    expect(await minigig.owner()).to.equal(owner.address);
  });

  it("Should allow a user to check in", async function () {
    const [owner, user] = await ethers.getSigners();
    const MiniGig = await ethers.getContractFactory("MiniGig");
    const minigig = await MiniGig.deploy();

    await minigig.connect(user).checkIn();
    const stats = await minigig.getUserStats(user.address);
    expect(stats.rewards).to.equal(10);
    expect(stats.streak).to.equal(1);
  });

  it("Should allow a user to complete a gig", async function () {
    const [owner, user] = await ethers.getSigners();
    const MiniGig = await ethers.getContractFactory("MiniGig");
    const minigig = await MiniGig.deploy();

    const taskId = ethers.encodeBytes32String("task1");
    await minigig.connect(user).completeGig(taskId);
    
    const stats = await minigig.getUserStats(user.address);
    expect(stats.totalGigs).to.equal(1);
    expect(stats.rewards).to.equal(50);
  });

  it("Should prevent duplicate check-ins on the same day", async function () {
    const [owner, user] = await ethers.getSigners();
    const MiniGig = await ethers.getContractFactory("MiniGig");
    const minigig = await MiniGig.deploy();

    await minigig.connect(user).checkIn();
    await expect(minigig.connect(user).checkIn()).to.be.revertedWith("Already checked in today");
  });
});
