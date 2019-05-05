import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection1Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import MarkdownContent from '../MarkdownContent'
import Navbar from '../Navbar'
import DonationsRaised from '../DonationsRaised'

const AboutOrgTitle = styled.h1`
`

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
          <BackgroundImage Tag="section"
            className={className}
            fluid={data.background.childImageSharp.fluid}
            style={{ backgroundPosition: 'right' }}
          // backgroundColor={`#040e18`}
          >
            <ContentLayout top={[3, 3, 4]}>
              <Navbar dark />
              <AboutOrgTitle>
                {section1.heading1}
              </AboutOrgTitle>
              <Box width={[1, 1, 1 / 2]} p={[0, 1, 1]}>
                <MarkdownContent content={section1.description1} />
                <br></br>
                <DonationsRaised donationAmount={donationAmount} />
              </Box>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

AboutOrganizationComponent.propTypes = {
  section1: aboutSection1Type.isRequired
}

export default AboutOrganizationComponent
