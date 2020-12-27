import React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

import PageHeader from '../components/header';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Helmet title="Furnitures Online Store" />
      <LayoutContainer>
        <header>
          <PageHeader />
        </header>
        <main>{children}</main>
      </LayoutContainer>
    </>
  );
};

export default Layout;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'PT Serif', serif;
  }

  button {
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-size: 1.1rem;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
`;

const LayoutContainer = styled.div`
  --container-width: 1000px;
  --container-padding: 1em;

  min-height: 100vh;
  display: grid;
  grid-template-columns:
    calc((100vw - var(--container-width) - var(--container-padding) - 1px) / 2)
    [main-start] 1fr [main-end] calc(
      (100vw - var(--container-width) - var(--container-padding) - 1px) / 2
    );
  grid-template-rows: [header-start] 5em [header-end] auto;

  & > header {
    border-bottom: 1px solid #000;
    grid-column: 1 / -1;
    grid-row: header-start / header-end;
  }

  main {
    grid-column: main-start / main-end;
    padding: 1em 2em;
  }
`;
