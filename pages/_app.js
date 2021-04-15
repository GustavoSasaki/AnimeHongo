/* eslint-disable react/prop-types */
import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';

import db from '../src/db/styleDb.json';
import HeaderMenu from '../src/components/HeaderMenu';
import Footer from '../src/components/Footer/Footer';

const { theme } = db;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Nimbus Romans';
  }
  
  body {
    background-color:${() => theme.BKColor};
  }
`;

const Body = styled.div`
  display: grid;
  grid-gap: 30px;

  min-height: 100vh;

  grid-template-areas:
    'h'
    'b'
    'f';

  grid-template-columns: 1fr;
  grid-template-rows: 40px auto 40px;
`;

const HeaderStyled = styled(HeaderMenu)`
  grid-area: h;
`;

const FooterStyled = styled(Footer)`
  grid-area: f;
`;
const Table = styled.div`
  grid-area: b;
`;

export default function App({ Component, pageProps }) {
  const [AouthInfo, SetAouthInfo] = React.useState(undefined);
  pageProps.AouthInfo = AouthInfo;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Head>
        <title>{db.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Body>
        <HeaderStyled title={db.title} SetAouthInfo={SetAouthInfo} />

        <Table>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Table>

        <FooterStyled />
      </Body>
    </ThemeProvider>
  );
}
