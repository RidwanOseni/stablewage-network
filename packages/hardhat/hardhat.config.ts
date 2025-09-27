import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

// NOTE: Removed the missing import of generateTsAbis

// Hardhat Backend RPC Provider API Key
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// Deployer Private Key
const deployerPrivateKey =
process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// Etherscan/Block Explorer API Key for verification
const etherscanApiKey = process.env.ETHERSCAN_V2_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

const config: HardhatUserConfig = {
solidity: {
compilers: [
{
version: "0.8.20",
settings: {
optimizer: {
enabled: true,
// https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
runs: 200,
},
},
},
],
},
defaultNetwork: "stablewage_network",
namedAccounts: {
deployer: {
// By default, it will take the first Hardhat account as the deployer
default: 0,
},
},
networks: {
// View the networks that are pre-configured.
// If the network you are looking for is not here you can add new network settings
stablewage_network: {
url: `https://0x4e454287.rpc.aurora-cloud.dev`,
chainId: 1313161863,
gasPrice: 1000000000,
accounts: [deployerPrivateKey],
verify: {
etherscan: {
apiUrl: "https://0x4e454287.explorer.aurora-cloud.dev/api/",
apiKey: 'legendcli',
},
},
},
},
// Configuration for harhdat-verify plugin
etherscan: {
apiKey: etherscanApiKey,
},
// Configuration for etherscan-verify from hardhat-deploy plugin
verify: {
etherscan: {
apiKey: etherscanApiKey,
},
},
sourcify: {
enabled: false,
},
};

// NOTE: Removed the task extension that called the missing script.

export default config;