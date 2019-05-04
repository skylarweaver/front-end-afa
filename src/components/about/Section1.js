import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection1Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'

const AboutOrgTitle = styled.h1`
`

const OrgDescription = styled.p`
`

const AboutOrganizationComponent = ({ className, section1 }) => {
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
            <ContentLayout className={className}>
              <AfaLogo dark link />
              <AboutOrgTitle>
                {section1.heading1}
              </AboutOrgTitle>
              <OrgDescription>
                {section1.description1}
              </OrgDescription>
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
