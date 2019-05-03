import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"

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
          <AfaGlobalStyle />
          <LayoutContainer>
            <Helmet>
              <html lang="en" style={{ height: '100%' }} />
              <title>{data.site.siteMetadata.title}</title>
              <meta name="description" content={data.site.siteMetadata.description} />

              <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
              <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
              <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />

              <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
              <meta name="theme-color" content="#fff" />

              <meta property="og:type" content="business.business" />
              <meta property="og:title" content={data.site.siteMetadata.title} />
              <meta property="og:url" content="/" />
              <meta property="og:image" content="/img/og-photo.jpg" />
              <meta property="og:site-name" content={data.site.siteMetadata.title} />
              <meta property="og:description" content="1 motorcycle. 16 countries. 17,000 miles to Patagonia. All for Alopecia awareness and support" />

            </Helmet>
            {/* <Navbar /> */}
            {/* <Content> */}
              {children}
            {/* </Content> */}
            <StyledFooter />
          </LayoutContainer>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout
