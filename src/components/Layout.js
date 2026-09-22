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
              keywords,
            }
          }
        }
    `}
    render={data => {
      const { siteUrl, title, description, keywords } = data.site.siteMetadata
      const ogImage = `${siteUrl}/img/og-photo.png`
      return (
        <ThemeProvider theme={afaTheme}>
          <React.Fragment>
            <AfaGlobalStyle />
            <LayoutContainer>
              <Helmet>
                <html lang="en"/>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content="Skylar Weaver" />
                {/* Begin favicons declaration */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <meta name="theme-color" content="#ffffff" />
                {/* End favicons declaration */}

                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:alt" content="Skylar with Alopecia on a motorcycle" />
                <meta property="og:site_name" content="Adventures for Alopecia" />
                <meta property="og:description" content="1 motorcycle. 14 countries. 21,000 miles to Patagonia. All for Alopecia awareness and support." />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={ogImage} />
                <meta name="twitter:image:alt" content="Skylar with Alopecia on a motorcycle" />
              </Helmet>
              <Navbar />
              {children}
              <StyledFooter />
            </LayoutContainer>
          </React.Fragment>
        </ThemeProvider>
      )
    }}
  />
)

export default Layout
