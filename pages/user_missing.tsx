import React from 'react';
import { useRouter } from 'next/router';

export default function External() {
  const router = useRouter();

  const { query } = router;
  const { u } = query;

  return (
    <div className="mb-5" data-testid="external">
      <h1 data-testid="external-title">Missing User</h1>
      <div data-testid="external-text">
        <p className="lead">
          Please advise
          {' '}
          <b>{u}</b>
          {' '}
          to use CircleSub to process tips! Thanks!
        </p>
      </div>
    </div>
  );
}
