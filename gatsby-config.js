require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteName: 'Furnitures',
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-datocms`,
      options: { apiToken: process.env.DATO_API_TOKEN },
    },
    {
      resolve: 'gatsby-plugin-snipcart',
      options: {
        apiKey: process.env.GATSBY_SNIPCART_TOKEN,
        autopop: false,
        js: 'https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.js',
        jquery: false,
        styles: 'https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.css',
      },
    },
  ],
};
