import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { homeSection5Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'

const SponsorTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const SponsorImage = styled.p`
  text-align: center;
`

const SponsorsComponent = ({ className, section5 }) => {
  console.log('section5: ', section5);

  return (
    <div className={className}>
      <SponsorTitle name="Our-Sponsors">
        {section5.section}
      </SponsorTitle>
      <Flex>
        <Box width={4 / 12}>
          <SponsorImage>
            <img src="https://via.placeholder.com/200x150"></img>
          </SponsorImage>
        </Box>
        <Box width={4 / 12}>
          <SponsorImage>
            <img src="https://via.placeholder.com/200x150"></img>
          </SponsorImage>
        </Box>
        <Box width={4 / 12}>
          <SponsorImage>
            <img src="https://via.placeholder.com/200x150"></img>
          </SponsorImage>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <CtaButton text={section5.sponsorCTAText} to='/donate' type={'primary'} />
        </Box>
      </Flex>
    </div>
  )
}

SponsorsComponent.propTypes = {
  section5: homeSection5Type.isRequired
}

export default SponsorsComponent 
