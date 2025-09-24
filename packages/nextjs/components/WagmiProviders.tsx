"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmiConfig';
import React from 'react';

// Set up a React Query client.
// Wagmi hooks use this client for fetching and caching blockchain data.
const queryClient = new QueryClient();

export function WagmiProviders({ children }: { children: React.ReactNode }) {
  const WagmiProviderAny = WagmiProvider as unknown as React.ComponentType<{ config: typeof wagmiConfig; children?: React.ReactNode }>;
  return (
    <WagmiProviderAny config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProviderAny>
  );
}