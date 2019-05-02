import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { Flex, Box } from '@rebass/grid'
import { homeSection1Type } from '../../proptypes/home-proptypes'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'

const StyledHeroComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'PT Sans', sans-serif;
  padding: 0 15px;
  height: calc(100% - 3.25rem);
`
const HeroHeadings = styled.div`
  @media (max-width: 900px) {
    // margin-top: 20px;
    // font-size: 42px;
  }
`
const HeroHeading = styled.h1`
  width: 100%;
`
const HeroDescription = styled.p`
  margin-top: 25px;
  // color: white;
  @media (max-width: 900px) {
    font-size: 16px;
    margin-top: 15px;
  }
`
const donateText = styled.h4`
  margin-top: 30px;
  font-size: 14px;
  @media (max-width: 900px) {
    font-size: 20px;
    margin-top: 50px;
    text-align: center;
  }
`

const HeroComponent = ({ className, section1 }) => {
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
        // backgroundColor={`#040e18`}
        >
          <ContentLayout>
            <HeroHeadings>
              <HeroHeading>{heroHeading1}</HeroHeading>
              <HeroHeading>{heroHeading2}</HeroHeading>
              <HeroHeading>{heroHeading3}</HeroHeading>
            </HeroHeadings>
            <Box width={7 / 12}>
              <HeroDescription>
                {description1}
              </HeroDescription>
            </Box>
            <CtaButton text={'Donate'} to={'/donate'} type={'primary'} />
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
