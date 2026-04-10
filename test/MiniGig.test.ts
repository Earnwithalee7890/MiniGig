import { expect } from "chai";
import { ethers } from "hardhat";

describe("MiniGig", function () {
  it("Should set the right owner", async function () {
    const [owner] = await ethers.getSigners();
    const MiniGig = await ethers.getContractFactory("MiniGig");
    const minigig = await MiniGig.deploy();
    expect(await minigig.owner()).to.equal(owner.address);
  });
});
