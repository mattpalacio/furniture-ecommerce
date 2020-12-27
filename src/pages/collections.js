import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Layout from '../layouts';

const CollectionsPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query CollectionsQuery {
      collections: allDatoCmsCollection {
        nodes {
          id
          name
        }
      }
    }
  `);

  return (
    <Layout>
      <Wrapper>
        <header>
          <h1>Collections</h1>
        </header>

        <ul>
          {data.collections.nodes.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${location.pathname}/${name.toLowerCase()}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </Layout>
  );
};

export default CollectionsPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  header {
    margin: 0.5em 0 2em;
    text-align: center;
    font-family: 'PT Serif', serif;
  }

  ul {
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5em;
  }

  li {
    padding: 2em 1em;
    background: black;
    color: white;
    font-size: 1.375rem;
    text-align: center;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
