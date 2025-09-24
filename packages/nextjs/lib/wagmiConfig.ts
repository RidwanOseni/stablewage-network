import { http, createConfig } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { defineChain } from 'viem';

// 1. Define the custom StableWage Network
export const stableWageChain = defineChain({
  id: 1313161863,
  name: 'StableWage Network',
  nativeCurrency: {
    decimals: 18,
    name: 'StableWage Network',
    symbol: 'SWN',
  },
  rpcUrls: {
    default: {
      http: ['https://0x4e454287.rpc.aurora-cloud.dev'],
      webSocket: ['wss://0x4e454287.rpc.aurora-cloud.dev'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://0x4e454287.explorer.aurora-cloud.dev',
    },
  },
});

// 2. Define WalletConnect Project ID (Best practice: read from env, fall back to default)
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64';

// 3. Create the Wagmi configuration object
export const wagmiConfig = createConfig({
  // Include StableWage, Mainnet, and Base chains
  chains: [stableWageChain, mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    // Specify the transport for the custom StableWage Chain and others
    [stableWageChain.id]: http(stableWageChain.rpcUrls.default.http[0]),
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});