import { http, createConfig } from 'wagmi'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import scaffoldConfig, { virtualChain } from 'scaffold.config'

// The WalletConnect Project ID is retrieved from your scaffold configuration 
const projectId = scaffoldConfig.walletConnectProjectId

export const config = createConfig({
  // Use the custom StableWage Network chain 
  chains: [virtualChain],
  connectors: [
    // Injected: For browser extensions like MetaMask when used directly 
    injected(),
    // WalletConnect: For browser and mobile support 
    walletConnect({ projectId }),
    // Explicit MetaMask connector 
    metaMask(),
    // Safe (Gnosis Safe) connector 
    safe(),
  ],
  transports: {
    // Define HTTP transport for the StableWage Network chain ID
    [virtualChain.id]: http(),
  },
})