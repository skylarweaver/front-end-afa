import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { Flex, Box } from '@rebass/grid'
import { homeSection1Type } from '../../proptypes/home-proptypes'
import ContentLayout from '../ContentLayout'
import Navbar from '../Navbar'
import DonationsRaised from '../DonationsRaised'
import chevron from '../../img/icons/chevron-white.png'
import { Parallax } from 'react-scroll-parallax';

const HeroHeadings = styled(Box)`
  display: flex;
  flex-direction: column;
`
const StyledNumberTitle = styled.h1`
  margin-top: 40px;
  margin-bottom: 0;
  font-family: Vidaloka;
  font-size: 48px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  &:first-of-type {
    margin-top: 40px;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin-top: 15px;
    font-size: 34px;
  }
`
const StyledTextTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-family: 'Playfair Display', PlayfairDisplay, serif;
  font-weight: 900;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
`
const Hr = styled.hr`
  width: 250px;
  margin: 2px 0;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 175px;
    margin: 1px 0;
  }
`
const HeroDescription = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Dosis;
  line-height: 1.5;
  color: #ffffff;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
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
            <ContentLayout top={[3,3,4]}>
              <Navbar />
              <HeroHeadings width={[1, 6/12, 4 / 12]}>
                <StyledNumberTitle>1</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>motorcycle</StyledTextTitle>
                <StyledNumberTitle>16</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>countries</StyledTextTitle>
                <StyledNumberTitle>17,000</StyledNumberTitle>
                <Hr align="left" ></Hr>
                <StyledTextTitle>miles to Patagonia</StyledTextTitle>
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
            <Flex justifyContent='center' mb={2}>
              <Parallax y={["0px", "-100px"]} tagOuter="figure">
                <img src={chevron} alt ='' width="50" height="100%"/>
              </Parallax>
            </Flex>
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
