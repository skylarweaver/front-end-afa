import React from 'react'
import styled from 'styled-components'
import { homeSection2Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import DonationsRaised from '../DonationsRaised'

const WhyTitle = styled.h2`
  margin-top: 120px;
  // margin-left: ${props => props.theme.space[4]}px;
  color: ${props => props.theme.white};
`

const WhyHeading = styled.h4`
  margin-bottom: 10px;
  color: ${props => props.theme.white};
`

const WhyText = styled.p`
  color: ${props => props.theme.white};
`

const WhySupportComponent = ({ className, section2, donationAmount }) => {
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
              <AfaLogo />
              <DonationsRaised donationAmount={donationAmount} />
              <WhyTitle name="Why-Alopecia">
                {section2.section}
              </WhyTitle>
              <Flex flexWrap='wrap'>
                <Box width={[1, 1, 4 / 12]} mx={[0, 0, 4]} px={1}>
                  <WhyHeading>
                    {section2.reason1.belief}
                  </WhyHeading>
                  <hr />
                  <WhyText>
                    {section2.reason1.description1}
                    <br></br>
                    <br></br>
                    {section2.reason1.description2}
                  </WhyText>
                </Box>
                <Box width={[1, 1, 4 / 12]} mx={[0, 0, 4]} px={1}>
                  <WhyHeading>
                    {section2.reason2.belief}
                  </WhyHeading>
                  <hr />
                  <WhyText>
                    {section2.reason2.description1}
                    <br></br>
                    <br></br>
                    {section2.reason2.description2}
                  </WhyText>
                </Box>
                <Box width={[1, 1, 4 / 12]} mx={[0, 0, 4]} px={1}>
                  <WhyHeading>
                    {section2.reason3.belief}
                  </WhyHeading>
                  <hr />
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

// const StyledWhySupportComponent = styled(WhySupportComponent)`
//   height: 900px;
// `

export default WhySupportComponent
