import { ethers } from "hardhat";

async function main() {
  console.log("Deploying DailyActivity to Celo Alfajores...");

  const DailyActivity = await ethers.getContractFactory("DailyActivity");
  const dailyActivity = await DailyActivity.deploy();

  await dailyActivity.waitForDeployment();

  console.log(`DailyActivity deployed to: ${await dailyActivity.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
