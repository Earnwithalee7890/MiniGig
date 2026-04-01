import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MiniGig = await ethers.getContractFactory("MiniGig");
  const miniGig = await MiniGig.deploy();

  await miniGig.waitForDeployment();

  console.log("MiniGig deployed to:", await miniGig.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
