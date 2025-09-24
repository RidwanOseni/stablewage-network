"use client";
import * as React from 'react';
import { Connector, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button
      disabled={!ready}
      onClick={onClick}
      variant="outline"
      className="w-full justify-start"
    >
      {connector.name}
    </Button>
  );
}

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="space-y-4">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </div>
  );
}