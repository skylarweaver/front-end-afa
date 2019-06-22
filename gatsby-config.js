// Import env variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: 'Adventures for Alopecia — Motorcycling USA to Argentina for Alopecia',
    description: 'Skylar—hairless from Alopecia since age 16—will ride a motorcycle solo from Washington, D.C. to the southern tip of Argentina in a 9-month expedition starting Summer 2019 to increase awareness of Alopecia, host support groups for Latin Americans with Alopecia, and advance Alopecia research.',
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
        id: `${process.env.GOOGLE_TAG_MANAGER_ID}`,
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
      resolve: `gatsby-plugin-csp`, // Places csp in meta tag in HEAD
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: true, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          "default-src": `'self'`, // Setting to self until prefetch-src is recognized in chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=801561
          "form-action": `'self' https://gmail.us20.list-manage.com/subscribe/post?u=546c93181e6c31f6acd023a26&amp;id=52dfb79458`,
          // "frame-ancestors": `'none'`, // Not allowed in Meta tag CSPs
          "style-src": `'self' 'unsafe-inline' https://fonts.googleapis.com https://api.tiles.mapbox.com`,
          "script-src": `'self' https://www.google-analytics.com https://js.stripe.com https://www.googletagmanager.com`,
          "img-src": `'self' data: blob: https://www.google-analytics.com https://via.placeholder.com`,
          "child-src": `blob:`,
          "worker-src": `blob:`,
          "connect-src": `'self' https://*.tiles.mapbox.com https://api.mapbox.com https://api.stripe.com ${process.env.SERVER_GET_DONATION_DATA_URL} ${process.env.SERVER_CHARGES_URL} ${process.env.SERVER_UPDATE_SHEET_URL} ${process.env.SERVER_GET_PUBLIC_DONATION_DATA_URL}`,
          "frame-src": `https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com/ns.html`,
          "font-src": `https://fonts.gstatic.com`,
          "manifest-src": `'self'`,
          // "prefetch-src": `'self'`, // Currently not recognized in Chrome sadly. So need to set default-src to 'self' instead of 'none'
        }
      },
    },
    {
      resolve: `gatsby-plugin-netlify`, // make sure to keep it last in the array
      options: {
        // headers: {}, // add headers for specific pages
        allPageHeaders: [
          // `Content-Security-Policy-Report-Only: 'base-uri 'self'; default-src 'none'; script-src 'self' https://www.google-analytics.com https://js.stripe.com https://www.googletagmanager.com 'sha256-3p+AUNMcBkjpMt/sOc8I50ZZ0QoBpoIe6NZWXhZ7EEk=' 'sha256-oHOPVioF45niic+NuMhu63iFGZzOyEcxz8o8x4ZECE4=' 'sha256-RIhl6R533qqffAOrJG49CwXSqnZzWkg8CD5NL82zXVQ='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.tiles.mapbox.com 'sha256-7tEAA5BzZDrFpK+TgSwIl/PYyyYeegqTwKTlIWxGW3E=' 'sha256-d0oOpYxzYlJGoT00DHTJnfgO7sauRueRYl2fOIo5FeI=' 'sha256-WLQ2/Uv4Xag2670dJ5u9zOGXO8cZjY1GiKdN7cc7zgs='; object-src 'none'; form-action 'none'; font-src https://fonts.gstatic.com; connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://api.stripe.com https://0zq56tlhid.execute-api.us-east-1.amazonaws.com/dev/getDonationData https://0zq56tlhid.execute-api.us-east-1.amazonaws.com/dev/charges https://0zq56tlhid.execute-api.us-east-1.amazonaws.com/dev/updateGoogleSheet https://0zq56tlhid.execute-api.us-east-1.amazonaws.com/dev/getPublicDonationData; img-src 'self' data: blob: https://www.google-analytics.com https://via.placeholder.com; frame-ancestors 'none'; child-src blob:; worker-src blob:; frame-src https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com/ns.html; manifest-src 'self';`,
          `Report-Uri: https://projectafa.report-uri.com/r/d/csp/reportOnly`,
          `Report-To: {"group":"default","max_age":31536000,"endpoints":[{"url":"https://projectafa.report-uri.com/a/d/g"}],"include_subdomains":true}`,
        ], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        // mergeSecurityHeaders: true, // boolean to turn off the default security headers
        // mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        // mergeCachingHeaders: true, // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        // generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
  ],
}
