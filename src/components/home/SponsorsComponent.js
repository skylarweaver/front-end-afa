import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { homeSection5Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import cycleRacksLogo from '../../img/logos/cycleracks.png'
import rockyMountainLogo from '../../img/logos/rockyMountainAtvMc.png'

const SponsorTitle = styled.h2`
  margin-top: 120px
`
const SponsorContainer = styled(Box)`
  text-align: center;
`

const SponsorImage = styled.img`
  // max-width: 100%;
  // max-height: 100%;
  max-width: 200px;
  max-height: 200px;
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
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0,0,3]} alignItems='center'>
          <SponsorContainer width={1} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/400x250"></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0,0,3]} alignItems='center'>
          <SponsorContainer width={6 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={6 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0,0,3]} alignItems='center'>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/200x150"></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0,0,3]} alignItems='center'>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <a href="https://cycleracks.com/" target="_blank">
              <SponsorImage alt="" src={cycleRacksLogo}></SponsorImage>
            </a>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <a href="https://www.rockymountainatvmc.com" target="_blank">
              <SponsorImage alt="" src={rockyMountainLogo}></SponsorImage>
            </a>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/150x100"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/150x100"></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src="https://via.placeholder.com/150x100"></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex>
          <Box mt={[2, 2, 4]}>
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