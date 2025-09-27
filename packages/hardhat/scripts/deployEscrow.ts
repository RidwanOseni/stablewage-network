import { ethers } from "hardhat";

// Define a placeholder address for the existing stablecoin contract
const USDCT_PLACEHOLDER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Define a placeholder address for the Platform Treasury/Advance Pool
// NOTE: In a real environment, this should be a known secure wallet address.
const PLATFORM_TREASURY_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

async function main() {
  console.log("Starting deployment of StableWage Contracts (Hardhat V2 style)...");

  // Get the Contract Factories
  const EscrowContractFactory = await ethers.getContractFactory("EscrowContract");
  const PayrollRouterFactory = await ethers.getContractFactory("PayrollRouter");

  // Deploy PayrollRouter
  console.log(`Deploying PayrollRouter with USDCT address: ${USDCT_PLACEHOLDER_ADDRESS}`);
  const payrollRouter = await PayrollRouterFactory.deploy(USDCT_PLACEHOLDER_ADDRESS);
  await payrollRouter.waitForDeployment();
  const payrollRouterAddress = await payrollRouter.getAddress();

  console.log(`PayrollRouter deployed to: ${payrollRouterAddress}`);

  // Deploy EscrowContract
  console.log(`Deploying EscrowContract with USDCT: ${USDCT_PLACEHOLDER_ADDRESS} and Treasury: ${PLATFORM_TREASURY_ADDRESS}`);
  const escrowContract = await EscrowContractFactory.deploy(USDCT_PLACEHOLDER_ADDRESS, PLATFORM_TREASURY_ADDRESS);
  await escrowContract.waitForDeployment();
  const escrowContractAddress = await escrowContract.getAddress();

  console.log(`EscrowContract deployed to: ${escrowContractAddress}`);
  
  // NOTE: These addresses must be saved and used in the frontend configuration (lib/constants.ts)
  console.log("\nDeployment complete. Save these addresses:");
  console.log(`USDCT_ADDRESS: ${USDCT_PLACEHOLDER_ADDRESS}`);
  console.log(`PAYROLL_ROUTER_ADDRESS: ${payrollRouterAddress}`);
  console.log(`ESCROW_CONTRACT_ADDRESS: ${escrowContractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});