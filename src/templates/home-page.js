import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { homeSection1Type, homeSection2Type, homeSection3Type, homeSection4Type, homeSection5Type } from '../proptypes/home-proptypes'
import Content, { HTMLContent } from '../components/Content'
import HeroComponent from '../components/home/HeroComponent';
import WhySupportComponent from '../components/home/WhySupportComponent';
import JourneyComponent from '../components/home/JourneyComponent';
import AboutOrganizationComponent from '../components/home/AboutOrganizationComponent';
import SponsorsComponent from '../components/home/SponsorsComponent';

const HomePage = ({ data }) => {
  console.log('Home data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const section1 = frontmatter.section1;
  const section2 = frontmatter.section2;
  const section3 = frontmatter.section3;
  const section4 = frontmatter.section4;
  const section5 = frontmatter.section5;

  const StyledHeroComponent = styled(HeroComponent)`
    height: 900px;
  `;
  const StyledWhySupportComponent = styled(WhySupportComponent)`
    height: 900px;
  `;
  const StyledJourneyComponent = styled(JourneyComponent)`
    height: 900px;
  `;
  const StyledAboutOrganizationComponent = styled(AboutOrganizationComponent)`
    height: 900px;
  `;
  const StyledSponsorsComponent = styled(SponsorsComponent)`
    height: 900px;
    background-color: #ffffff;
  `;

  return (
    <Layout>
      {/* <StyledHomePageTemplate
        contentComponent={HTMLContent}
        title={markdownData.frontmatter.title}
        content={markdownData.html}
      /> */}
      <StyledHeroComponent section1={section1} />
      <StyledWhySupportComponent section2={section2} />
      <StyledJourneyComponent section3={section3} />
      <StyledAboutOrganizationComponent section4={section4} />
      <StyledSponsorsComponent section5={section5} />
    </Layout>
  )
}

export default HomePage

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        content: PropTypes.object,
        contentComponent: PropTypes.func,
        section1: homeSection1Type.isRequired,
        section2: homeSection2Type.isRequired,
        section3: homeSection3Type.isRequired,
        section4: homeSection4Type.isRequired,
        section5: homeSection5Type.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired,
}

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        section1 {
          heroHeading1
          heroHeading2
          heroHeading3
          description1
          donationText1
          donationText2
          donateCTAtext
          backgroundImage {
            childImageSharp {
              fluid(
                maxWidth: 1600,
                quality: 100,
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        section2 {
          section
          reason1 {
            belief
            description1
            description2
          }
          reason2 {
            belief
            description1
            description2
          }
          reason3 {
            belief
            description1
            description2
          }
        }
        section3 {
          section
          ctaText
          content {
            content1
            content2
            goal1
            goal2
            goal3
          }
        }
        section4 {
          section
          content
          donateCTAtext
          learnMoreCTAText
        }
        section5 {
          section
          sponsorCTAText
        }
      }
    }
  }
`

              // duotone: {
              //   highlight: "#a4ded4",
              //   shadow: "#4d384f"
              // }