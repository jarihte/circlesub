import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';

type ExternalProps = {
  publicKey: PublicKey | null;
};

export default function External(props: ExternalProps) {
  const { publicKey } = props;

  const [hasAddress, setHasAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchMyAPI = useCallback(async () => {
    if (publicKey) {
      setLoading(true);
      await fetch(`/api/wallet?a=${publicKey.toString()}`);
      setHasAddress(true);
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  if (hasAddress && session) {
    const tipURL = `${process.env.NEXT_PUBLIC_URL}/tip/${session.user?.name}`;

    const alertURL = `${process.env.NEXT_PUBLIC_URL}/alert/${session.user?.name}`;

    return (
      <>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
        <div style={{ marginTop: '20px' }}>
          <b>Your Tip Link is:</b>
          {' '}
          <a href={tipURL}>{tipURL}</a>
        </div>
        <div style={{ marginTop: '20px' }}>
          <b>Your OBS Alert link is:</b>
          {' '}
          <a href={alertURL}>{alertURL}</a>
        </div>
      </>
    );
  }

  if (!hasAddress) {
    return (
      <>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
        <div style={{ marginTop: '20px' }}>
          <BeatLoader color="#9146FF" loading={loading} size={50} />
        </div>
      </>
    );
  }

  return null;
}
