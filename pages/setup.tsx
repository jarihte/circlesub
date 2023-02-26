import React from 'react';
import { useSession } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Setup from '../components/Setup';

export default function External() {
  const { status } = useSession();
  const { publicKey } = useWallet();

  if (status === 'authenticated') {
    return (
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">CircleSub Setup</h1>
        <div data-testid="external-text">
          <div style={{ marginTop: '20px' }}>
            <h3>
              Setup Tipping
            </h3>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}><b>Connect your wallet:</b></div>
              <Setup publicKey={publicKey} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="mb-5" data-testid="external">
        <div data-testid="external-text">
          Please Login
        </div>
      </div>
    );
  }

  return null;
}
