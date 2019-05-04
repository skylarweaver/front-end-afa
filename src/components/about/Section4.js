import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection4Type } from '../../proptypes/about-proptypes'
import ContentLayout from '../ContentLayout'
import { Flex, Box } from '@rebass/grid'

const Section4Heading = styled.h2`
`

const StyledHeadshot = styled(Image)`
  max-width: 200px;
  margin: auto;
  margin-bottom: 20px;
`

const DirectorName = styled.h3`
	// font-size: 28px;
	// font-weight: bold;
	// letter-spacing: -0.98px;
  // line-height: 37px;
  text-align: center;
`

const DirectorDescription = styled.p`
	font-size: 16px;
	line-height: 24px;
`

const DirectorRole = styled.h4`
// font-size: 16px;
// line-height: 24px;
text-align: center;
`


const AboutOrganizationComponent = ({ className, section4 }) => {
  console.log('section4: ', section4);
  return (
    <StaticQuery query={graphql`
    query {
      skylar: file(relativePath: { eq: "skylar.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      kate: file(relativePath: { eq: "kate.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `}
      render={data => (
        <ContentLayout className={className}>
          <Section4Heading>
            {section4.section}
          </Section4Heading>
          <Flex>
            <Box width={[1, 6 / 12, 6 / 12]} mx={4} px={3}>
              <StyledHeadshot
                fluid={data.skylar.childImageSharp.fluid}
                alt="Professional Skylar"
              />
              <DirectorName>
                {section4.director1.name}
              </DirectorName>
              <DirectorRole>
                {section4.director1.role}
              </DirectorRole>
              <DirectorDescription>
                {section4.director1.description}
              </DirectorDescription>
            </Box>
            <Box width={[1, 6 / 12, 6 / 12]} mx={4} px={3}>
              <StyledHeadshot
                fluid={data.kate.childImageSharp.fluid}
                alt="Professional Kate"
              />
              <DirectorName>
                {section4.director2.name}
              </DirectorName>
              <DirectorRole>
                {section4.director2.role}
              </DirectorRole>
              <DirectorDescription>
                {section4.director2.description}
              </DirectorDescription>
            </Box>
          </Flex>
          <Flex>
            <Box width={4 / 12} mx={4} px={3}>
              <DirectorName>
                {section4.director3.name}
              </DirectorName>
              <DirectorRole>
                {section4.director3.role}
              </DirectorRole>
            </Box>
            <Box width={4 / 12} mx={4} px={3}>
              <DirectorName>
                {section4.director4.name}
              </DirectorName>
              <DirectorRole>
                {section4.director4.role}
              </DirectorRole>
            </Box>
            <Box width={4 / 12} mx={4} px={3}>
              <DirectorName>
                {section4.director5.name}
              </DirectorName>
              <DirectorRole>
                {section4.director5.role}
              </DirectorRole>
            </Box>
          </Flex>
        </ContentLayout>
      )} />
  )
}

AboutOrganizationComponent.propTypes = {
  section4: aboutSection4Type.isRequired
}

export default AboutOrganizationComponent
