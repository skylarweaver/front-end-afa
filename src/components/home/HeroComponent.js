import React from 'react'
import styled from 'styled-components'
import { homeSection1Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

const StyledHeroComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'PT Sans', sans-serif;
  color: white;
  padding: 0 15px;
  height: calc(100% - 3.25rem);
`
const HeroHeadings = styled.div`
  font-size: 50px;
  font-weight: bold;
  color: white;
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
  font-size: 18px;
  color: white;
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
  const backgroundImage = section1.backgroundImage;

  return (
    <div className={className}>
      {/* <Image
        fluid={backgroundImage.childImageSharp.fluid}
        // sizes={dataSizes}
        style={{
          position: "fixed",
          zIndex: -1,
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          filter: "brightness(65%)"
        }}
      /> */}
        <HeroHeadings>
          <HeroHeading>{heroHeading1}</HeroHeading>
          <HeroHeading>{heroHeading2}</HeroHeading>
          <HeroHeading>{heroHeading3}</HeroHeading>
        </HeroHeadings>
        <Box width={7/12}>
          <HeroDescription>
            {description1}
          </HeroDescription>
        </Box>
        <CtaButton text={'Donate'} to={'/donate'} type={'primary'}/>
    </div>
  )
}

HeroComponent.propTypes = {
  section1: homeSection1Type.isRequired
}

export default HeroComponent
