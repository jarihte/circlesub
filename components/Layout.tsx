import React from 'react';
import { Container } from 'reactstrap';
import Head from 'next/head';
import NavBar from './NavBar';
import Footer from './Footer';

type ILayout = {
  children: React.ReactNode;
  blank: boolean;
};

function Layout({ children, blank }: ILayout) {
  return (
    <>
      <Head>
        <title>CircleSub - SOL Twitch Tips</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Tip your favorite Twitch streamers!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main id="app" className="d-flex flex-column h-100" data-testid="layout">
        { !blank && (
          <>
            <NavBar />
            <Container className="flex-grow-1 mt-5">{children}</Container>
            <Footer />
          </>
        )}
        { blank && (
          <Container className="flex-grow-1 mt-5">{children}</Container>
        )}
      </main>
    </>
  );
}

export default Layout;
