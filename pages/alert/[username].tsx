import React from 'react';
import Alert from '../../components/Alert';
import App from '../_app';

function withNoLayout(WrappedComponent: React.ElementType) {
  // eslint-disable-next-line func-names
  return function () {
    return <App Component={WrappedComponent} pageProps={{ session: null }} blank />;
  };
}

export default withNoLayout(Alert);
