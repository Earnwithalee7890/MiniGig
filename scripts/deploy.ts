import { ethers } from "hardhat";

async function main() {
  const MiniGig = await ethers.getContractFactory("MiniGig");
  console.log("Deploying MiniGig...");
  const minigig = await MiniGig.deploy();

  await minigig.waitForDeployment();

  console.log("MiniGig deployed to:", await minigig.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
