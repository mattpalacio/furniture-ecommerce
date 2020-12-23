import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Layout from '../layouts';
import CollectionItem from '../components/collection-item';

const CollectionIndex = ({ pageContext, data, location }) => {
  const { collection, numberOfPages } = pageContext;

  return (
    <Layout>
      <Title>
        <h1>{collection ? collection : 'All Products'}</h1>
      </Title>

      <Pagination>
        {Array.from({ length: `${numberOfPages}` }, (_, i) =>
          collection ? (
            <Link
              to={
                i + 1 !== 1
                  ? `/collection/${collection.toLowerCase()}/${i + 1}`
                  : `/collection/${collection.toLowerCase()}`
              }
              activeClassName="active">
              {i + 1}
            </Link>
          ) : (
            <Link to={i + 1 !== 1 ? `/${i + 1}` : `/`} activeClassName="active">
              {i + 1}
            </Link>
          )
        )}
      </Pagination>

      <Container>
        {data.products.edges.map(({ node: product }) => (
          <li key={product.id}>
            <CollectionItem product={product} />
          </li>
        ))}
      </Container>
    </Layout>
  );
};

export default CollectionIndex;

export const pageQuery = graphql`
  query productPageQuery($collection: String, $skip: Int!, $limit: Int!) {
    products: allDatoCmsProduct(
      filter: { collection: { name: { eq: $collection } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          name
          price
          description
          collection {
            name
          }
          image {
            url
            fluid(imgixParams: { fm: "jpg" }, maxWidth: 300) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
    collections: allDatoCmsCollection {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;

const Title = styled.header`
  margin: 0.5em 0 0.5em;
  text-align: center;
  font-family: 'PT Serif', serif;
`;

const Pagination = styled.nav`
  margin-bottom: 1em;
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;

  a {
    text-decoration: none;

    &.active {
      text-decoration: underline;
    }
  }

  a + a {
    margin-left: 0.5em;
  }
`;

const Container = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 2.5em 3em;
  justify-items: center;
  justify-content: stretch;

  li {
    list-style: none;
  }
`;
