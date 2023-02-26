/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next/types';
import { SessionProviderProps } from 'next-auth/react';
import initFontAwesome from '../utils/initFontAwesome';
import '../styles/globals.css';

initFontAwesome();

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = {
  Component: NextPageWithLayout,
  pageProps: {
    session: SessionProviderProps['session'];
  };
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
