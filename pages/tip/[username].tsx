import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col } from 'reactstrap';
import Form from '../../components/Form';

export default function External() {
  const router = useRouter();
  const username = router.query.username?.toString();

  const ReactTwitchEmbedVideo = dynamic(
    () => import('react-twitch-embed-video'),
    { ssr: false },
  );

  const transakURL = `https://global.transak.com?apiKey=${process.env.NEXT_PUBLIC_TRANSAK}&cryptoCurrencyCode=SOL&network=solana&themeColor=9146FF&exchangeScreenTitle=Buy%20SOL%20-%20use%20debit%20only%20for%20US/Canada`;

  if (username) {
    return (
      <>
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <h1>{username}</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <Col md={6} className="mb-4">
            <ReactTwitchEmbedVideo channel={username} height="600" width="350" />
          </Col>
          <Col md={6} className="mb-4">
            <Form username={username} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <Col md={6} className="mb-4">
            &nbsp;
          </Col>
          <Col md={6} className="mb-4">
            <div>
              <iframe
                title="transak"
                height="650"
                src={transakURL}
                frameBorder="no"
                allowFullScreen
                style={{
                  display: 'block', width: '100%', maxHeight: '650px', maxWidth: '500px',
                }}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  }
  return null;
}
