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
});
