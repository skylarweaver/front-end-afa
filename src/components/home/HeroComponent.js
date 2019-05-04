import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { Flex, Box } from '@rebass/grid'
import { homeSection1Type } from '../../proptypes/home-proptypes'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import DonationsRaised from '../DonationsRaised'

const HeroHeadings = styled(Box)`
  display: flex;
  flex-direction: column;
`
const StyledNumberTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 0;
  font-family: Vidaloka;
  font-size: 48px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.12;
  letter-spacing: normal;
  color: #ffffff;
  &:first-of-type {
    margin-top: 40px;
  }
`
const StyledTextTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Playfair Display', PlayfairDisplay, serif;
  font-size: 48px;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.12;
  letter-spacing: normal;
  color: #ffffff;
`
const Hr = styled.hr`
  width: 250px;
  margin: 2px 0 2px 0;
`
const HeroDescription = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Dosis;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #ffffff;
  // color: white;
  @media (max-width: 900px) {
    font-size: 16px;
    margin-top: 15px;
  }
`
const LegalText = styled.p`
  margin-top: 20px;
  font-family: Dosis;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #ffffff;
`

const HeroComponent = ({ className, section1, donationAmount }) => {
  const heroHeading1 = section1.heroHeading1;
  const heroHeading2 = section1.heroHeading2;
  const heroHeading3 = section1.heroHeading3;
  const description1 = section1.description1;

  return (

    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "bg-skylar@2x.png" }) {
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
            style={{ backgroundPosition: 'top' }}
          // backgroundColor={`#040e18`}
          >
            <ContentLayout top='40px'>
              <AfaLogo link />
              <HeroHeadings width={[1, 7/12, 5 / 12]}>
                <StyledNumberTitle>1</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>Motorcycle</StyledTextTitle>
                <StyledNumberTitle>16</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>Countries</StyledTextTitle>
                <StyledNumberTitle>15,000</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>Miles to Patagonia</StyledTextTitle>
              </HeroHeadings>
              <Box width={[1, 7/12, 5 / 12]}>
                <HeroDescription>
                  {description1}
                </HeroDescription>
              </Box>
              <DonationsRaised donationAmount={donationAmount} />
              <LegalText>
                All donations are tax-deductible. <br></br>
                Adventures for Alopecia is a registered 501(c)(3) nonprofit organization.
            </LegalText>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

HeroComponent.propTypes = {
  section1: homeSection1Type.isRequired
}

export default HeroComponent
