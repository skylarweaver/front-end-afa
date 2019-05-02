import React from 'react'
import styled from 'styled-components'
import { homeSection2Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'
import CtaButton from '../CtaButton'

const WhyTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const WhyHeading = styled.h3`
	font-size: 28px;
	font-weight: bold;
	letter-spacing: -0.98px;
	line-height: 37px;
`

const WhyText = styled.p`
	font-family: Roboto;
	font-size: 16px;
	line-height: 24px;
`

const WhySupportComponent = ({ className, section2 }) => {
  console.log('section2: ', section2);

  return (

    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "bg-kid@2x.png" }) {
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
              <WhyTitle name="Why-Alopecia">
                {section2.section}
              </WhyTitle>
              <Flex>
                <Box width={4 / 12}>
                  <WhyHeading>
                    {section2.reason1.belief}
                  </WhyHeading>
                  <WhyText>
                    {section2.reason1.description1}
                    <br></br>
                    <br></br>
                    {section2.reason1.description2}
                  </WhyText>
                </Box>
                <Box width={4 / 12}>
                  <WhyHeading>
                    {section2.reason2.belief}
                  </WhyHeading>
                  <WhyText>
                    {section2.reason2.description1}
                    <br></br>
                    <br></br>
                    {section2.reason2.description2}
                  </WhyText>
                </Box>
                <Box width={4 / 12}>
                  <WhyHeading>
                    {section2.reason1.belief}
                  </WhyHeading>
                  <WhyText>
                    {section2.reason3.description1}
                    <br></br>
                    <br></br>
                    {section2.reason3.description2}
                  </WhyText>
                </Box>
              </Flex>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

WhySupportComponent.propTypes = {
  section2: homeSection2Type.isRequired
}

export default WhySupportComponent
