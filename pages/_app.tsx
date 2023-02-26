/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter, SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';
import Layout from '../components/Layout';

initFontAwesome();

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  // if layout is set to false then have no layout
  if (Component.layout) {
    return (
      <Component {...pageProps} />
    );
  }

  // You can also provide a custom RPC endpoint.
  const endpoint = process.env.NEXT_PUBLIC_RPC;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [endpoint],
  );

  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
