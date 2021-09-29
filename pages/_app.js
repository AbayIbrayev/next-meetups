import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { Fragment } from 'react';
import Head from 'next/head';

import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Next Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active meetups!'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
