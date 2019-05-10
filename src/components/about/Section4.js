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
  margin-bottom: 10px;
`

const DirectorName = styled.h3`
  text-align: center;
  margin: 0px;
`

const DirectorRole = styled.h4`
text-align: center;
margin: 10px;
`

const DirectorDescription = styled.p`
  margin-bottom: 30px;
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
      aaron: file(relativePath: { eq: "aaron.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      robert: file(relativePath: { eq: "robert.png" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      weston: file(relativePath: { eq: "weston.png" }) {
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
          <Flex flexWrap={['wrap', 'wrap', 'initial']}>
            <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
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
            <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
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
          <Flex flexWrap={['wrap', 'wrap', 'initial']} mt={[0,0,3]}>
            <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]} mt={[5, 5, 0]}>
              <StyledHeadshot
                fluid={data.aaron.childImageSharp.fluid}
                alt="Professional Skylar"
              />
              <DirectorName>
                {section4.director3.name}
              </DirectorName>
              <DirectorRole>
                {section4.director3.role}
              </DirectorRole>
            </Box>
            <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]} mt={[5, 5, 0]}>
              <StyledHeadshot
                fluid={data.weston.childImageSharp.fluid}
                alt="Professional Skylar"
              />
              <DirectorName>
                {section4.director4.name}
              </DirectorName>
              <DirectorRole>
                {section4.director4.role}
              </DirectorRole>
            </Box>
            <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]} mt={[5, 5, 0]}>
              <StyledHeadshot
                fluid={data.robert.childImageSharp.fluid}
                alt="Professional Skylar"
              />
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
