import React from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';
import Hero from '../components/Hero';
import Content from '../components/Content';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const component : NextPageWithLayout = function Page() {
  const meldURL = 'https://fluidmoney.xyz/?publicKey=WGuE3CWry1j4o3R9t48HYN:3b7Vi66ub2NFjbAYH3WsLzQMZ2Vp8gDjQQDv&destinationCurrencyCodeLocked=USDC_SOLANA';

  return (
    <>
      <Hero />
      <hr />
      <Content />
      <div className="text-center" style={{ marginBottom: '100px' }}>
        <Link href={meldURL} target="_blank">
          <Button className="rounded" style={{ width: '30%', height: '100px', fontSize: '1.5rem' }}>Buy Solana USDC</Button>
        </Link>
      </div>
    </>
  );
};

component.getLayout = (page) => (
  <Layout props={page.props}>{page}</Layout>
);

export default component;
