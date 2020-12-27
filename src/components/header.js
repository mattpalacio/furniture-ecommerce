import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';
import Portal from './portal';

const Header = () => {
  const data = useStaticQuery(graphql`
    query CollectionsAndSiteQuery {
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

  const [showCollection, setShowCollection] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  return (
    <Container>
      <Title to="/">{data.site.siteMetadata.siteName}</Title>

      <NavWrapper>
        <button onClick={() => setShowCollection((prevState) => !prevState)}>
          <FontAwesomeIcon icon={showCollection ? faCaretUp : faCaretDown} />{' '}
          Collections
        </button>

        {showCollection && (
          <nav>
            <ul>
              {data.collections.nodes.map(({ id, name }) => (
                <li key={id}>
                  <Link to={`/collections/${name.toLowerCase()}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <button className="snipcart-summary snipcart-checkout">
          In Cart: <span className="snipcart-items-count"></span>
        </button>
      </NavWrapper>

      <MenuButton onClick={() => setOpenNav(true)}>Menu</MenuButton>

      {openNav && (
        <Portal>
          <MenuWrapper>
            <button onClick={() => setOpenNav(false)}>
              <FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon> Back
            </button>

            <nav>
              <ul>
                <li>
                  <Link to="/" onClick={() => setOpenNav(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/collections" onClick={() => setOpenNav(false)}>
                    Collections
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setOpenNav(false)}
                    className="snipcart-summary snipcart-checkout">
                    Cart
                  </button>
                </li>
              </ul>
            </nav>
          </MenuWrapper>
        </Portal>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  max-width: 1000px;
  height: 100%;
  padding: 1em 2em;
  margin: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  button {
    padding: 0;
    background: transparent;

    &:last-child {
      margin-left: 1em;
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    font-size: 1.2rem;
  }
`;

const NavWrapper = styled.div`
  display: none;
  position: relative;

  nav {
    background: white;
    box-shadow: 5px 5px 10px hsla(0, 0%, 0%, 0.5);
    position: absolute;
    top: 30px;
    right: calc(50% - 0.3em);
    z-index: 5;
  }

  ul {
    padding: 0.6em 1.2em;
    text-align: right;
  }

  li:not(:last-child) {
    margin-bottom: 0.3em;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 768px) {
    & {
      display: block;
    }
  }
`;

const Title = styled(Link)`
  margin-right: auto;
  font-size: 2.5rem;
  text-decoration: none;
  line-height: 0.9;

  &:visited {
    color: inherit;
  }
`;

const MenuButton = styled.button`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  font-family: 'PT Sans', sans-serif;
  font-size: 2rem;
  z-index: 5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    padding: 0;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  & > button {
    font-family: inherit;
    font-size: 1.2rem;
    position: absolute;
    top: 2.25em;
    left: 1.5em;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li:not(:last-child) {
    margin-bottom: 0.5em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
