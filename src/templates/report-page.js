import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import ContentLayout from '../components/ContentLayout'
import { HTMLContent } from '../components/Content'
import SponsorsComponent from '../components/home/SponsorsComponent'

const Article = styled.article`
  max-width: 760px;
  margin: 0 auto;
`

// The home page sponsor logo grid, reused under the report
const ReportSponsors = styled(SponsorsComponent)`
  background-color: #ffffff;
  h2 {
    margin-top: 40px;
  }
`

const ReportDate = styled.p`
  font-style: italic;
  color: ${props => props.theme.greyNeutral};
  margin-top: 0;
`

// Long-form markdown content. Headings and paragraphs pick up the global styles;
// this adds the pieces the global styles do not cover.
const ReportBody = styled(HTMLContent)`
  img {
    max-width: 100%;
    height: auto;
  }
  h2 {
    margin-top: 48px;
  }
  h3 {
    margin-top: 32px;
  }
  ul, ol {
    padding-left: 24px;
  }
  li {
    font-family: 'Dosis', sans-serif;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.33;
    color: ${props => props.theme.blackNeutral};
    margin-bottom: 8px;
  }
  blockquote {
    margin: 24px 0;
    padding-left: 20px;
    border-left: solid 4px ${props => props.theme.primaryLight};
    font-style: italic;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Dosis', sans-serif;
    font-size: 18px;
    color: ${props => props.theme.blackNeutral};
  }
  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: solid 1px #cfcfcf;
  }
  figcaption {
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme.greyNeutral};
  }
  .gatsby-resp-image-wrapper {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  /* Two photos side by side, stacking on narrow screens (see final-report.md) */
  .photo-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin: 24px -8px;
  }
  .photo-row p {
    flex: 1 1 300px;
    max-width: 400px;
    margin: 0;
    padding: 0 8px;
  }
  .photo-row .gatsby-resp-image-wrapper {
    margin-top: 0;
    margin-bottom: 16px;
  }
`

const ReportPage = ({ data }) => {
  const { markdownRemark: report } = data
  const { title, date, description, showSponsors } = report.frontmatter

  return (
    <Layout>
      <Helmet>
        <title>{`${title} | Adventures for Alopecia`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <ContentLayout topSection>
        <Article>
          <h1>{title}</h1>
          {date && <ReportDate>{date}</ReportDate>}
          <ReportBody content={report.html} />
        </Article>
      </ContentLayout>
      {showSponsors && <ReportSponsors section5={{ section: 'Big thanks to our amazing sponsors!', sponsorCTAText: '' }} />}
    </Layout>
  )
}

ReportPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string,
        description: PropTypes.string,
        showSponsors: PropTypes.bool,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default ReportPage

export const reportPageQuery = graphql`
  query ReportPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        showSponsors
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`
