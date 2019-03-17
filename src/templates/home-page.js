import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const HomePageTemplate = ({ title, content, contentComponent, heroHeading, description1, description2, description3, backgroundImage, section2, section3, section4 }) => {
  // const PageContent = contentComponent || Content

  const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'PT Sans', sans-serif;
  color: white;
  padding: 0 15px;
  height: calc(100% - 3.25rem);
`
  const HeroHeading1 = styled.h1`
  margin-top: 150px;
  text-align: center;
  font-size: 80px;
  font-weight: 700;
  @media (max-width: 900px) {
    margin-top: 20px;
    font-size: 42px;
  }
`
  const DescriptionSubheading = styled.h1`
  margin-top: 25px;
  text-align: center;
  font-style: italic;
  font-size: 32px;
  font-weight: 600;
  @media (max-width: 900px) {
    font-size: 24px;
    margin-top: 15px;
  }
`
  const HeroDescription1 = styled.h1`
  margin-top: 130px;
  font-size: 26px;
  max-width: 600px;
  line-height: 1.15;
  text-shadow: 0px 0px 40px black;
  @media (max-width: 900px) {
    font-size: 20px;
    margin-top: 50px;
    text-align: center;
  }
`
const SiteComingSoon = styled.h1`
margin-top: 90px;
margin-bottom: 30px;
font-size: 18px;
font-style: italic;
text-shadow: 0px 0px 40px black;
@media (max-width: 900px) {
  margin-top: 40px;
  font-size: 12px;
}
`

const HeroDescription2 = styled.h1`
  margin-top: 70px;
  font-size: 26px;
  max-width: 600px;
  line-height: 1.15;
`


  // const User = props => (
  //   <Definit>
  //     <Avatar src={props.avatar} alt="" />
  //     <Description>
  //       <Username>{props.username}</Username>
  //       <Excerpt>{props.excerpt}</Excerpt>
  //     </Description>
  //   </UserWrapper>
  // )

  return (
    <HeroContainer>
      <Image
        fluid={backgroundImage.childImageSharp.fluid}
        // sizes={dataSizes}
        style={{
          position: "fixed",
          zIndex: -1,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          filter: "brightness(65%)"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        }}
      />
      <HeroHeading1>{heroHeading}</HeroHeading1>
      <DescriptionSubheading>{description1}</DescriptionSubheading>
      <HeroDescription1>{description2}</HeroDescription1>
      <SiteComingSoon>Full site coming soon</SiteComingSoon>
      {/* <HeroDescription2>{description3}</HeroDescription2> */}
    </HeroContainer>
      // {/* {section4.content.sponsor1.name}
      // {section4.content.sponsor2.name}
      // {section4.content.sponsor3.name} */}
      // <div className="container">
      //   <div className="columns">
      //     <div className="column is-10 is-offset-1">
      //       <div className="section">
      //         <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
      //           {title}
      //         </h2>
      //         <PageContent className="content" content={content} />
      //       </div>
      //     </div>
      //   </div>
      // </div>
  )
}

HomePageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  heroHeading: PropTypes.string.isRequired,
  description1: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  description3: PropTypes.string.isRequired,
  backgroundImage: PropTypes.object.isRequired,
  section2: PropTypes.shape({
    section: PropTypes.string,
    heading: PropTypes.shape({ belief: PropTypes.string }),
    heading2: PropTypes.shape({ belief: PropTypes.string }),
    heading3: PropTypes.shape({ belief: PropTypes.string })
  }),
  section3: PropTypes.shape({
    section: PropTypes.string,
    content: PropTypes.shape({
      content1: PropTypes.string,
      content2: PropTypes.string
    })
  }),
  section4: PropTypes.shape({
    section: PropTypes.string,
    content: PropTypes.shape({
      sponsor1: PropTypes.shape({ name: PropTypes.string }),
      sponsor2: PropTypes.shape({ name: PropTypes.string }),
      sponsor3: PropTypes.shape({ name: PropTypes.string })
    })
  })
}

const HomePage = ({ data }) => {
  console.log('Home data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const section2 = frontmatter.section2;
  const section3 = frontmatter.section3
  const section4 = frontmatter.section3
  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={markdownData.frontmatter.title}
        content={markdownData.html}
        heroHeading={frontmatter.section1.heroHeading}
        description1={frontmatter.section1.description1}
        description2={frontmatter.section1.description2}
        description3={frontmatter.section1.description3}
        backgroundImage={frontmatter.section1.backgroundImage}
        section2={section2}
        section3={section3}
        section4={section4}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

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
                maxWidth: 2048,
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