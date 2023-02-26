import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Row, Col } from 'reactstrap';
import { Typography } from '@mui/material';
import Form from '../../components/Form';

export default function External() {
  const router = useRouter();
  const username = router.query.username?.toString();

  const ReactTwitchEmbedVideo = dynamic(
    () => import('react-twitch-embed-video'),
    { ssr: false },
  );

  if (username) {
    return (
      <>
        <Row className="d-flex justify-content-center">
          <Col md={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              <b>Twitch:</b>
              {' '}
              {username}
            </Typography>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
          <Col md={6} className="mb-4">
            <ReactTwitchEmbedVideo channel={username} />
          </Col>
          <Col md={6} className="mb-4">
            <Form username={username} />
          </Col>
        </Row>
      </>
    );
  }
  return null;
}
