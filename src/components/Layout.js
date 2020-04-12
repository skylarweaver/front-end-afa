import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import Navbar from '../components/Navbar'

import Footer from './Footer'
import './all.sass'
import { ThemeProvider } from 'styled-components'
import { afaTheme } from '../styles/afaTheme'
import { AfaGlobalStyle } from '../styles/afaGlobalStyles'

const LayoutContainer = styled.div`
  height: 100%;
`

const StyledFooter = styled(Footer)`
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.tertiary};
  a {
    color: ${props => props.theme.primaryLight};
  }
`

const Layout = ({ children, theme }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              siteUrl,
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <ThemeProvider theme={afaTheme}>
        <React.Fragment>
          <AfaGlobalStyle />
          <LayoutContainer>
            <Helmet>
              <html lang="en"/>
              <title>{data.site.siteMetadata.title}</title>
              <meta name="description" content={data.site.siteMetadata.description} />
              <meta name="keywords" content={data.site.siteMetadata.keywords} />
              <meta name="author" content="Skylar Weaver" />
              {/* <link rel="prefetch" href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css' as="style" /> */}
              <link rel="prefetch" href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css' as="style" />
              <link rel="dns-prefetch" href='https://m.stripe.com' as="style" />
              <link rel="prefetch" src="https://cdn.polyfill.io/v2/polyfill.min.js" as="script" />
              {/* Begin favicons declaration */}
              <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
              <link rel="manifest" href="/favicons/site.webmanifest" />
              <meta name="theme-color" content="#ffffff" />
              {/* End favicons declaration */}

              <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
              <meta property="og:type" content="business.business" />
              <meta property="og:title" content={data.site.siteMetadata.title} />
              <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
              <meta property="og:image" content="/img/og-photo.png" />
              <meta property="og:image:type" content="image/png" />
              <meta property="og:image:alt" content="Skylar with Alopecia on a motorcycle" />
              <meta property="og:site-name" content={data.site.siteMetadata.title} />
              <meta property="og:description" content="1 motorcycle. 16 countries. 17,000 miles to Patagonia. All for Alopecia awareness and support." />
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:image" content="/img/og-photo.png" />
              <meta property="twitter:image:alt" content="Skylar with Alopecia on a motorcycle" />
            </Helmet>
            <Navbar />
            {children}
            <StyledFooter />
          </LayoutContainer>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout
