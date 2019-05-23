import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import { ParallaxProvider } from 'react-scroll-parallax';

import Navbar from './Navbar'
import Footer from './Footer'
import HomePage from '../templates/home-page'
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
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <ThemeProvider theme={afaTheme}>
        <React.Fragment>
          <ParallaxProvider>
            <AfaGlobalStyle />
            <LayoutContainer>
              <Helmet>
                <html lang="en" style={{ height: '100%' }} />
                <title>{data.site.siteMetadata.title}</title>
                <meta name="description" content={data.site.siteMetadata.description} />

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
                <meta property="og:url" content="/" />
                <meta property="og:image" content="/img/og-photo.jpg" />
                <meta property="og:site-name" content={data.site.siteMetadata.title} />
                <meta property="og:description" content="1 motorcycle. 16 countries. 17,000 miles to Patagonia. All for Alopecia awareness and support." />

              </Helmet>
              {children}
              <StyledFooter />
            </LayoutContainer>
          </ParallaxProvider>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout
