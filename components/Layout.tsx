/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, ReactNode, useMemo } from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { NextPage } from 'next/types';
import '@fortawesome/fontawesome-svg-core/styles.css';
import SubLayout from './SubLayout';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = {
  children: ReactNode;
  props: {
    session: SessionProviderProps['session'];
  };
};

export default function Layout({ children, props }: AppPropsWithLayout) {
  const { session } = props;

  // You can also provide a custom RPC endpoint.
  const endpoint = process.env.NEXT_PUBLIC_RPC as string;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [endpoint],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <SessionProvider session={session}>
          <SubLayout>
            {children}
          </SubLayout>
        </SessionProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
