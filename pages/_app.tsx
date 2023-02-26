/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@fortawesome/fontawesome-svg-core/styles.css';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';
import Layout from '../components/Layout';

initFontAwesome();

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

interface AppProps {
  Component: React.ElementType;
  pageProps: {
    session: SessionProviderProps['session'];
  };
  blank: boolean;
}

export default function App({ Component, pageProps, blank }: AppProps): JSX.Element {
  const { session, ...rest } = pageProps;

  // You can also provide a custom RPC endpoint.
  const endpoint = process.env.NEXT_PUBLIC_RPC as string;
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [endpoint],
  );

  usePageViews();

  console.log('blank', blank);

  return (
    <>
      <GoogleAnalytics />
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <SessionProvider session={session}>
            <Layout blank>
              <Component {...rest} />
            </Layout>
          </SessionProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
