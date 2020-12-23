import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query CollectionsQuery {
      collections: allDatoCmsCollection {
        nodes {
          id
          name
        }
      }
      site {
        siteMetadata {
          siteName
        }
      }
    }
  `);

  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Helmet title="Furnitures Online Store" />
      <LayoutContainer>
        <Header>
          <div>
            <h1>
              <StyledLink to="/">{data.site.siteMetadata.siteName}</StyledLink>
            </h1>

            <Nav>
              <button onClick={() => setShowNav((prevState) => !prevState)}>
                Collections
              </button>

              {showNav && (
                <nav>
                  <ul>
                    {data.collections.nodes.map(({ id, name }) => (
                      <li key={id}>
                        <Link to={`/collection/${name.toLowerCase()}`}>
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </Nav>

            <button className="snipcart-summary snipcart-checkout">
              In Cart: <span className="snipcart-items-count"></span>
            </button>
          </div>
        </Header>
        <main>{children}</main>
      </LayoutContainer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.func,
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
  min-height: 100vh;
  display: grid;
  grid-template-columns: calc((100vw - 1000px) / 2) [main-start] 1fr [main-end] calc(
      (100vw - 1000px) / 2
    );
  grid-template-rows: [header-start] 5em [header-end] auto;

  main {
    grid-column: main-start / main-end;
    padding: 1em 2em;
  }
`;

const Header = styled.header`
  border-bottom: 1px solid #000;
  grid-column: 1 / -1;
  grid-row: header-start / header-end;

  & > div {
    max-width: 1000px;
    height: 100%;
    padding: 1em 2em;
    margin: auto;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  h1 {
    margin-right: auto;
    line-height: 1;
  }

  button {
    padding: 0;
    background: transparent;

    &:last-child {
      margin-left: 1em;
    }
  }
`;

const Nav = styled.div`
  position: relative;

  nav {
    width: 100%;
    background: white;
    position: absolute;
    top: 30px;
    z-index: 5;
  }

  ul {
    padding: 0.2em 0.6em;
    list-style: none;
    text-align: right;
  }

  li {
    font-size: 1.2rem;

    &:not(:last-child) {
      margin-bottom: 0.2em;
    }
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:visited {
    color: inherit;
  }
`;
