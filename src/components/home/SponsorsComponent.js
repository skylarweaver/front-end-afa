import React from 'react'
import styled from 'styled-components'
import { homeSection5Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import Link from '../GatsbyLink'
import placeholder from '../../img/logos/placeholder.png'
import cycleracksLogo from '../../img/logos/cycleracks.png'
import rockyMountainLogo from '../../img/logos/rockyMountainAtvMc.png'
import ameripriseLogo from '../../img/logos/ameriprise.png'
import rokkerLogo from '../../img/logos/rokker.png'
import giviLogo from '../../img/logos/givi.png'
import swMototechLogo from '../../img/logos/swMototech.png'
import twistedThrottleLogo from '../../img/logos/twistedThrottle.png'

const SponsorTitle = styled.h2`
  margin-top: 120px
`
const SponsorContainer = styled(Box)`
  position: relative;
  text-align: center;
`

const SponsorImage = styled.img`
  max-width: 100%;
  max-height: 300px;
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
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
          <SponsorContainer width={1} mx={[1, 2, 3]}>
            <SponsorImage alt="" src={placeholder}></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
          <SponsorContainer width={[5 / 12, 6 / 12, 6 / 12]} mx={[1, 2, 3]}>
            <Link to="https://www.rockymountainatvmc.com">
              <SponsorImage alt="rocky mountain atv mc" src={rockyMountainLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={[5 / 12, 6 / 12, 6 / 12]} mx={[1, 2, 3]}>
              <Link to="https://www.giviusa.com">
                <SponsorImage alt="givi usa" src={giviLogo}></SponsorImage>
              </Link>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <Link to="https://www.twistedthrottle.com/">
              <SponsorImage alt="Twisted Throttle" src={twistedThrottleLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <Link to="https://sw-motech.com/en/">
              <SponsorImage alt="SW-MotoTech" src={swMototechLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <Link to="https://www.therokkercompany.com/?lang=en">
              <SponsorImage alt="cycleracks" src={rokkerLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src={placeholder}></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
          <Link to="https://cycleracks.com/">
              <SponsorImage alt="cycleracks" src={cycleracksLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src={placeholder}></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src={placeholder}></SponsorImage>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <Link to="https://www.ameriprise.com/">
              <SponsorImage alt="Ameriprise Financial" src={ameripriseLogo}></SponsorImage>
            </Link>
          </SponsorContainer>
          <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
            <SponsorImage alt="" src={placeholder}></SponsorImage>
          </SponsorContainer>
        </Flex>
        <Flex>
          <Box mt={4}>
            <CtaButton text={section5.sponsorCTAText} type={'secondary'} to={`mailto:info@projectafa.org?&subject=Corporate%20Sponsorship%20Package%20for%20AFA&body=Hi%20there%2C%0A%0AI%20would%20be%20interested%20in%20learning%20more%20about%20the%20corporate%20sponsorship%20packages%20you%20offer%20as%20our%20company%20may%20be%20interested%20in%20supporting%20Adventures%20for%20Alopecia.%0A%0AIf%20you%20could%20send%20over%20the%20corporate%20sponsorship%20package%2C%20that%20would%20be%20great.%0A%0AThanks%2C%0AYOUR%20NAME`} />
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
