import React from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const component : NextPageWithLayout = () => {
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
};

component.getLayout = (page) => (
  <Layout props={page.props}>{page}</Layout>
);

export default component;
