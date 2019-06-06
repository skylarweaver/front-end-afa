import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { aboutSection1Type } from '../../proptypes/about-proptypes'
import { Box } from '@rebass/grid'
import ContentLayout from '../ContentLayout'
import Navbar from '../Navbar'
import DonationsRaised from '../DonationsRaised'

const AboutOrgTitle = styled.h1`
`
// const PhotoSource = styled.p`
// 	font-size: 12px;
// 	font-style: italic;
// 	letter-spacing: 0.27px;
//   line-height: 24px;
//   float: right;
// `

// const SkylarSignature = styled.p`
//   text-align: right;
//   font-style: italic;
//   margin-right: 50px;
// `

const AboutOrganizationComponent = ({ className, section1, donationAmount }) => {
  console.log('section1: ', section1);

  return (
    <StaticQuery query={graphql`
      query {
        background: file(relativePath: { eq: "bg@3x.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
      render={data => {
        return (
          // <BackgroundImage Tag="section"
          //   className={className}
          //   fluid={data.background.childImageSharp.fluid}
          //   style={{ backgroundPosition: 'right' }}
          // // backgroundColor={`#040e18`}
          // >
          <ContentLayout top={[3, 3, 4]} className={className}>
            <Navbar dark about />
            <AboutOrgTitle>
              {section1.heading1}
            </AboutOrgTitle>
            <Box width={[1, 1, 1 / 2]} p={[0, 1, 1]}>
              {/* <MarkdownContent content={section1.description1} /> */}
              <p>
                With an affinity for travel and a love of Latin America, Skylar has dreamed of a motorcycle trip from the USA to Argentina for years. But he wanted the trip to be bigger than himself. To have a greater purpose. Riding a motorcycle a few thousand miles across continents is one thing, but changing lives along the way—that’s the real goal.
              </p>
              <p>
                Having lost all of his hair as a teen, Skylar was introduced to life with Alopecia and exposed to the first-hand emotional tolls Alopecia has on people—especially women, children, and young adults. So he did some research on Alopecia in Latin America… and found nothing in the way of support. Alopecia is an autoimmune disease affecting all races and sexes around the world—yet support and awareness efforts are isolated to a few first-world countries. Adventures for Alopecia aims to change that, and we’re starting in Central and South America. We’re working with the few support groups that exist (and forming new ones where needed) throughout Latin America to sponsor support events. We’re educating the international public about Alopecia, and we’re supporting Alopecia treatment research.
              </p>
              <p>
                After this inaugural adventure for Alopecia, we will sponsor adventures for other people with Alopecia to regain their confidence and identity through adventure and travel. What started as a dream to explore and experience the various Latin American countries, has become more than that. Through these efforts, we hope to change the lives of people around the world living with Alopecia.
              </p>
              <br/>
              <DonationsRaised donationAmount={donationAmount} />
            </Box>
            {/* <PhotoSource>
                Photo Source: <Link to="http://www.naaf.org">NAAF.org</Link>
              </PhotoSource> */}
          </ContentLayout>
          // </BackgroundImage>
        )
      }}
    />
  )
}

AboutOrganizationComponent.propTypes = {
  section1: aboutSection1Type.isRequired
}

export default AboutOrganizationComponent
