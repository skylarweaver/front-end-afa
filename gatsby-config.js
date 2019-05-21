// Import env variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'Adventures for Alopecia',
    description: 'Skylar—hairless from Alopecia since age 16—will ride a motorcycle solo from Washington, D.C. to the southern tip of Argentina in a 9-month expedition starting Summer 2019 to increase awareness of Alopecia, host support groups for Latin Americans with Alopecia, and advance Alopecia research.',
    keywords: 'alopecia,adventures,bald,skylar,motorcycle,patagonia,argentina,south america,alopecia adventures'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-stripe`,
      options: {
        async: true,
      },
    },
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-PC4MVVM",

        // Include GTM in development.
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true,            // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    },
    {
      resolve: `gatsby-plugin-netlify`, // make sure to keep it last in the array
      options: {
        headers: {
          "/*": [
            `Content-Security-Policy-Report-Only: default-src 'none'; form-action 'none'; frame-ancestors 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.tiles.mapbox.com; script-src 'self' https://www.google-analytics.com https://js.stripe.com https://www.googletagmanager.com; img-src 'self' data: blob: https://www.google-analytics.com https://via.placeholder.com ; child-src blob: ; worker-src blob: ; connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://api.stripe.com ${process.env.SERVER_GET_DONATION_DATA_URL} ${process.env.SERVER_CHARGES_URL} ${process.env.SERVER_UPDATE_SHEET_URL} ${process.env.SERVER_GET_PUBLIC_DONATION_DATA_URL}; frame-src https://js.stripe.com https://hooks.stripe.com; font-src https://fonts.gstatic.com ; manifest-src 'self';`,
          ],
        },
        allPageHeaders: [ // option to add headers for all pages. `Link` headers are transformed by the below criteria
        ],
        // mergeSecurityHeaders: true, // boolean to turn off the default security headers
        // mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        // mergeCachingHeaders: true, // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        // generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
  ],
}
