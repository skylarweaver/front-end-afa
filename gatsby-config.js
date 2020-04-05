// Import .env variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

// Disable robot scraping on Netlify branch previews
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://www.projectafa.org',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

// Begin Gatsby Config
module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Adventures for Alopecia — Motorcycling USA to Argentina for Alopecia',
    description: 'Skylar—hairless from Alopecia since age 16—is riding a motorcycle from Washington, D.C. to the southern tip of Argentina in an effort to improve the lives of those who have lost their hair and perceived identity to the autoimmune disease Alopecia.',
    keywords: 'Adventures, Adventure, Alopecia, Motorcycle, Alaska, Argentina, Patagonia, Skylar'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // Generate site map for SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/overview.pdf`, '/IRSnotice.pdf', '/static/AFA_IRS_501c3_Approval-1ac535eb0d4e441fecf4228b88ce4fd1.pdf', '/static/AFA_Mail_Donation-98fa795eaaaf1a2ca6db66d3cfe4e638.pdf']
      }
    },
    // Generate robots.txt for SEO (disable scraping on branch deploys)
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: 'https://www.projectafa.org/sitemap.xml',
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }]
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-stripe`,
      options: {
        async: true,
      },
    },
    `gatsby-plugin-loggly`,
    `gatsby-plugin-styled-components`,
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
          "default-src": `'self' https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css`, // Setting to self until prefetch-src is recognized in chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=801561
          "form-action": `'self' https://gmail.us20.list-manage.com/subscribe/post`,
          // "frame-ancestors": `'none'`, // Not allowed in Meta tag CSPs
          "style-src": `'self' 'unsafe-inline' https://fonts.googleapis.com https://api.tiles.mapbox.com`,
          "script-src": `'self' https://www.google-analytics.com https://js.stripe.com https://www.googletagmanager.com https://cdn.polyfill.io/v2/polyfill.min.js cdn.report-uri.com https://cloudfront.loggly.com/js/loggly.tracker-latest.min.js 'sha256-+IfKQIMtilYuMw7kjuxIEceziPqO5SRuzCvM5hQ0E8Y='`,
          "img-src": `'self' data: blob: https://www.google-analytics.com https://via.placeholder.com`,
          "child-src": `blob:`,
          "worker-src": `blob:`,
          "connect-src": `'self' https://*.tiles.mapbox.com https://api.mapbox.com https://api.stripe.com projectafa.report-uri.com ${process.env.SERVER_GET_DONATION_DATA_URL} ${process.env.SERVER_CHARGES_URL} ${process.env.SERVER_UPDATE_SHEET_URL} ${process.env.SERVER_GET_PUBLIC_DONATION_DATA_URL} ${process.env.SERVER_GET_LOCATION_DATA_URL} https://logs-01.loggly.com`,
          "frame-src": `https://www.youtube.com/ https://js.stripe.com https://hooks.stripe.com https://www.googletagmanager.com/ns.html`,
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
