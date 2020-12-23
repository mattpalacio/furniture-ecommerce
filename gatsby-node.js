const path = require('path');
const paginate = require('gatsby-awesome-pagination').paginate;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        query ProductsQuery {
          products: allDatoCmsProduct {
            edges {
              node {
                id
                name
                collection {
                  id
                  name
                }
              }
            }
          }
          collections: allDatoCmsCollection {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const products = result.data.products.edges;

        const collections = result.data.collections.edges;

        collections.forEach(({ node: collection }) => {
          const collectionItems = products.filter(
            ({ node: product }) => collection.name === product.collection.name
          );

          paginate({
            createPage,
            items: collectionItems,
            component: path.resolve('./src/templates/collection-index.js'),
            itemsPerPage: 6,
            pathPrefix: `/collection/${collection.name.toLowerCase()}`,
            context: {
              collection: collection.name,
            },
          });
        });

        paginate({
          createPage,
          items: products,
          component: path.resolve('./src/templates/collection-index.js'),
          itemsPerPage: 6,
          pathPrefix: '/',
        });
      })
    );
  });
};
