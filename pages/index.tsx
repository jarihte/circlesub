import React from 'react';
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
      <div className="text-center">
        <iframe
          title="meld"
          height="800px"
          src={meldURL}
          style={{
            width: '100%', maxHeight: '800px', maxWidth: '500px',
          }}
        />
      </div>
    </>
  );
};

component.getLayout = (page) => (
  <Layout props={page.props}>{page}</Layout>
);

export default component;
