import { run } from "hardhat";

async function main() {
  const contractAddress = process.env.DAILY_ACTIVITY_CONTRACT;
  
  if (!contractAddress) {
    console.error("Please set DAILY_ACTIVITY_CONTRACT in .env");
    return;
  }

  console.log("Verifying DailyActivity on Celoscan...");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("Verification successful!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Contract is already verified.");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
