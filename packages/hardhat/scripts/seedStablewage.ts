import { ethers } from "hardhat";

// The ABIs necessary to interact with the deployed contracts
const ERC20_ABI = [
"function approve(address spender, uint256 amount) external returns (bool)",
"function balanceOf(address account) external view returns (uint256)",
"function allowance(address owner, address spender) external view returns (uint256)",
];

async function seedStablewage() {

  // Hardcoded addresses for local testing.
  // This USDCT_ADDRESS is a placeholder address [1].
  const USDCT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // 1. Get the signer (Hardhat V2/Ethers V6 standard method)
  const [deployerWallet] = await ethers.getSigners();
  const employerAddress = deployerWallet.address;

  console.log(`Using Employer Address (Deployer): ${employerAddress}`);

  // --- IMPORTANT: UPDATE THIS ADDRESS ---
  // Since you successfully deployed Escrow, replace the placeholder below
  // with the actual address of the deployed EscrowContract.
  const ESCROW_ADDRESS = "0x32eB2439F3833e1FA9e6fa18508510D2344Db28C"; 
  // ------------------------------------

  console.log(`Attempting to set allowance on USDCT (${USDCT_ADDRESS}) for Escrow (${ESCROW_ADDRESS}).`);

  // Define a large approval amount (100,000 USDCT, using 6 decimals [2])
  const allowanceAmount = ethers.parseUnits("100000", 6);

  // 1. Setup ERC20 contract interaction using Ethers V6
  const usdctContract = new ethers.Contract(USDCT_ADDRESS, ERC20_ABI, deployerWallet);

  // 2. Execute the approve transaction
  // The Employer calls approve() on the USDCT contract for the Escrow contract [3-5].
  const tx = await usdctContract.approve(ESCROW_ADDRESS, allowanceAmount);
  console.log(`Approval Transaction Hash: ${tx.hash}`);

  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  console.log(`Approval complete at block ${receipt?.blockNumber}.`);

  // 3. Verify the allowance
  const allowance = await usdctContract.allowance(employerAddress, ESCROW_ADDRESS);
  
  // Calculate display amount
  const allowanceDisplay = Number(ethers.formatUnits(allowance, 6)); 
  
  console.log(`Verified Allowance for Escrow: ${allowanceDisplay} USDCT`);
}

seedStablewage().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});