import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Layout from '../layouts';
import CollectionItem from '../components/collection-item';

const CollectionIndex = ({ pageContext, data }) => {
  const { collection, numberOfPages } = pageContext;

  return (
    <Layout>
      <Title>
        <h1>{collection ? collection : 'All Products'}</h1>
      </Title>

      <Container>
        {data.products.edges.map(({ node: product }) => (
          <li key={product.id}>
            <CollectionItem product={product} />
          </li>
        ))}
      </Container>

      {numberOfPages > 1 && (
        <Pagination>
          {Array.from({ length: `${numberOfPages}` }, (_, i) =>
            collection ? (
              <Link
                key={collection.toLowerCase() + i}
                to={
                  i + 1 !== 1
                    ? `/collections/${collection.toLowerCase()}/${i + 1}`
                    : `/collections/${collection.toLowerCase()}`
                }
                activeClassName="active">
                {i + 1}
              </Link>
            ) : (
              <Link
                key={i}
                to={i + 1 !== 1 ? `/all/${i + 1}` : `/`}
                activeClassName="active">
                {i + 1}
              </Link>
            )
          )}
        </Pagination>
      )}
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
  }
`;

const Title = styled.header`
  margin: 0.5em 0 2em;
  text-align: center;
  font-family: 'PT Serif', serif;
`;

const Container = styled.ul`
  margin-bottom: 2em;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2em 1em;
  justify-items: center;
  justify-content: stretch;

  li {
    list-style: none;
  }
`;

const Pagination = styled.nav`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;

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
