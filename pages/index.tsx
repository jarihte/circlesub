import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout';

const component : NextPageWithLayout = function Page() {
  return (
    <>
      <Hero />
      <hr />
      <Content />
    </>
  );
};

component.getLayout = (page) => (
  <Layout props={page.props}>{page}</Layout>
);

export default component;
