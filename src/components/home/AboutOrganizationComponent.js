import React from 'react'
import styled from 'styled-components'
import { homeSection4Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'

const AboutOrgTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const OrgDescription = styled.p`
	font-size: 16px;
	line-height: 24px;
`

const AboutOrgImage = styled.p`
`

const AboutOrganizationComponent = ({ className, section4 }) => {
  console.log('section4: ', section4);
  return (

    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "bg@3x.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
      render={data => {
        const imageData = data.desktop.childImageSharp.fluid
        return (
          <BackgroundImage Tag="section"
            className={className}
            fluid={imageData}
          >
            <ContentLayout>
              <AboutOrgTitle name="About-AFA">
                {section4.section}
              </AboutOrgTitle>
              <Flex>
                <Box width={6 / 12}>
                  <OrgDescription>
                    {section4.content}
                  </OrgDescription>
                </Box>
                <Box width={6 / 12}>
                  <AboutOrgImage>
                    Image of someone with aloecia
                  </AboutOrgImage>
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <CtaButton text={section4.donateCTAtext} to={'/donate'} type={'primary'} />
                </Box>
                <Box>
                  <CtaButton text={section4.learnMoreCTAText} to={'/about'} type={'secondary'} />
                </Box>
              </Flex>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

AboutOrganizationComponent.propTypes = {
  section4: homeSection4Type.isRequired
}

export default AboutOrganizationComponent
