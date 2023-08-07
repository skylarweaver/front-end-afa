import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { CountUp } from 'countup.js'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { Box } from '@rebass/grid'
import { homeSection1Type } from '../../proptypes/home-proptypes'
import ContentLayout from '../ContentLayout'
import DonationsRaised from '../DonationsRaised'
import Chevron from '../Chevron'

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

export default class HeroComponent extends React.Component {
  constructor(props) {
    super(props);
    this.description1 = props.section1.description1;
  }

  componentDidMount() {
    let countryCountUp = new CountUp('countries', 14, { duration: 1.5, useEasing: false });
    let milesCountUp = new CountUp('miles', 21000, { duration: 2 });
    if (!countryCountUp.error) {
      countryCountUp.start();
    } else {
      console.error(countryCountUp.error);
    }
    if (!milesCountUp.error) {
      milesCountUp.start();
    } else {
      console.error(milesCountUp.error);
    }
  }

  render() {
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
              className={this.props.className}
              fluid={imageData}
              style={{ backgroundPosition: 'top' }}
            // backgroundColor={`#040e18`}
            >
              <ContentLayout topSection>
                <HeroHeadings width={[1, 6 / 12, 6 / 12]}>
                  <StyledNumberTitle id='motorcycles'>1</StyledNumberTitle>
                  <Hr align="left" ></Hr>
                  <StyledTextTitle>motorcycle</StyledTextTitle>
                  <StyledNumberTitle id='countries'>14</StyledNumberTitle>
                  <Hr align="left" ></Hr>
                  <StyledTextTitle>countries</StyledTextTitle>
                  <StyledNumberTitle id='miles'>21,000</StyledNumberTitle>
                  <Hr align="left" ></Hr>
                  <StyledTextTitle>miles to Patagonia</StyledTextTitle>
                </HeroHeadings>
                <Box width={[1, 7 / 12, 7 / 12, 5 / 12]}>
                  <HeroDescription>
                    {this.description1}
                  </HeroDescription>
                </Box>
                <DonationsRaised donationAmount={this.props.donationAmount} />
                <LegalText>
                                    <br></br>
                
                  <br></br>
                  </LegalText>
                <Chevron />
              </ContentLayout>
            </BackgroundImage>
          )
        }}
      />
    )
  }
}

HeroComponent.propTypes = {
  section1: homeSection1Type.isRequired
}
