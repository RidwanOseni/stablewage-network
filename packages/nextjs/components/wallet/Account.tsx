"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/lib/utils';

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });

  if (!address) return null;

  return (
    <div className="flex items-center space-x-2">
      {ensAvatar && (
        <img alt="ENS Avatar" src={ensAvatar} className="w-6 h-6 rounded-full" />
      )}
      <div className="text-sm font-medium">
        {ensName ? `${ensName} (${shortenAddress(address)})` : shortenAddress(address)}
      </div>
      <Button onClick={() => disconnect()} variant="ghost" size="sm">
        Disconnect
      </Button>
    </div>
  );
}