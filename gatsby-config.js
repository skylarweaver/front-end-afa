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
    title: 'Adventures for Alopecia: Motorcycling USA to Argentina for Alopecia',
    description: 'Skylar, bald from Alopecia since age 16, rode a motorcycle 21,000 miles from Washington, D.C. to Ushuaia, Argentina (2019 to 2022) to support people living with the autoimmune disease Alopecia. Archive of the completed project.',
    keywords: 'Adventures for Alopecia, Alopecia, Alopecia Areata, Motorcycle, Pan-American Highway, Argentina, Patagonia, Ushuaia, Skylar Weaver'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // Generate site map for SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/overview.pdf`, '/IRSnotice.pdf', '/static/AFA_IRS_501c3_Approval-1ac535eb0d4e441fecf4228b88ce4fd1.pdf']
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
    // Basic page-view analytics with Google Analytics 4. Renders nothing when no ID is set.
    {
      resolve: 'gatsby-plugin-ga4',
      options: {
        measurementId: process.env.GA4_MEASUREMENT_ID,
      },
    },
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
        reportOnly: false,
        mergeScriptHashes: true, // hashes inline scripts (Gatsby runtime, GA4 snippet)
        mergeStyleHashes: false,
        mergeDefaultDirectives: true,
        directives: {
          // Setting to self until prefetch-src is recognized in chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=801561
          "default-src": `'self' https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css`,
          "form-action": `'none'`, // The site has no forms since donations and the newsletter closed
          "style-src": `'self' 'unsafe-inline' https://fonts.googleapis.com https://api.tiles.mapbox.com`,
          "script-src": `'self' https://www.googletagmanager.com`,
          "img-src": `'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com`,
          "child-src": `blob:`,
          "worker-src": `blob:`,
          "connect-src": `'self' https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`,
          "frame-src": `https://www.youtube.com/`, // Good Morning Washington clip on the About page
          "font-src": `https://fonts.gstatic.com`,
          "manifest-src": `'self'`,
        }
      },
    },
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
}
