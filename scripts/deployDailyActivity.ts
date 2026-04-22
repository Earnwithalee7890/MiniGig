import { ethers } from "hardhat";

async function main() {
  const DailyActivity = await ethers.getContractFactory("DailyActivity");
  console.log("Deploying DailyActivity...");
  const dailyActivity = await DailyActivity.deploy();

  await dailyActivity.waitForDeployment();

  console.log("DailyActivity deployed to:", await dailyActivity.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
