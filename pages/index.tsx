import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import Referrer from '../components/Referrer';

export default function Index() {
  const transakURL = `https://global.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK}&cryptoCurrencyCode=SOL&network=solana&themeColor=9146FF&exchangeScreenTitle=Buy%20SOL%20-%20use%20debit%20only%20for%20US/Canada`;

  return (
    <>
      <Referrer />
      <Hero />
      <hr />
      <Content />
      <div className="text-center">
        <iframe
          title="transak"
          height="650"
          src={transakURL}
          frameBorder="no"
          allowFullScreen
          style={{
            width: '100%', maxHeight: '650px', maxWidth: '500px',
          }}
        />
      </div>
    </>
  );
}
