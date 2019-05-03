import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { homeSection5Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import DonationsRaised from '../DonationsRaised'

const SponsorTitle = styled.h2`
  margin-top: 120px
`

const SponsorImage = styled.p`
  text-align: center;
`


const SponsorsComponent = ({ className, section5 }) => {
  console.log('section5: ', section5);

  return (
    <div className={className}>
      <ContentLayout>
        <AfaLogo dark />
        <SponsorTitle name="Our-Sponsors">
          {section5.section}
        </SponsorTitle>
        <Flex justifyContent="center">
          <Box width={1}>
            <SponsorImage>
              <img src="https://via.placeholder.com/400x250"></img>
            </SponsorImage>
          </Box>
        </Flex>
        <Flex justifyContent="center">
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
        <Flex justifyContent="center">
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
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/200x150"></img>
            </SponsorImage>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
          <Box width={4 / 12}>
            <SponsorImage>
              <img src="https://via.placeholder.com/50x50"></img>
            </SponsorImage>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <CtaButton text={section5.sponsorCTAText} to='/donate' type={'secondary'} />
          </Box>
        </Flex>
      </ContentLayout>
    </div>
  )
}

SponsorsComponent.propTypes = {
  section5: homeSection5Type.isRequired
}

export default SponsorsComponent 
