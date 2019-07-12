import React from 'react'
import styled from 'styled-components'

import { homeSection5Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import Link from '../GatsbyLink'

import { graphql, StaticQuery } from 'gatsby'
import Image from 'gatsby-image/withIEPolyfill'

const SponsorTitle = styled.h2`
  margin-top: 120px
`
const SponsorContainer = styled(Box)`
  position: relative;
  text-align: center;
`

const SponsorImage = styled(Image)`
  max-width: 100%;
  max-height: 300px;
`

const SponsorsComponent = ({ className, section5 }) => {
  return (
    <StaticQuery query={graphql`
      query {
        placeholder: file(relativePath: { eq: "logos/placeholder.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        cycleracks: file(relativePath: { eq: "logos/cycleracks.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        rockyMountainAtvMc: file(relativePath: { eq: "logos/rockyMountainAtvMc.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        booz: file(relativePath: { eq: "logos/booz.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ameriprise: file(relativePath: { eq: "logos/ameriprise.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        rokker: file(relativePath: { eq: "logos/rokker.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        givi: file(relativePath: { eq: "logos/givi.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        swMototech: file(relativePath: { eq: "logos/swMototech.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        twistedThrottle: file(relativePath: { eq: "logos/twistedThrottle.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        trezor: file(relativePath: { eq: "logos/trezor.png" }) {
          childImageSharp {
            fluid(quality: 80, maxHeight: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
    
      }
    `}
      render={data => (
        <div className={className}>
          <ContentLayout>
            <AfaLogo dark />
            <SponsorTitle name="Our-Sponsors">
              {section5.section}
            </SponsorTitle>
            <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
              <SponsorContainer width={1} mx={[1, 2, 3]}>
                <Link to={`mailto:info@projectafa.org?&subject=Corporate%20Sponsorship%20Package%20for%20AFA&body=Hi%20there%2C%0A%0AI%20would%20be%20interested%20in%20learning%20more%20about%20the%20corporate%20sponsorship%20packages%20you%20offer%20as%20our%20company%20may%20be%20interested%20in%20supporting%20Adventures%20for%20Alopecia.%0A%0AIf%20you%20could%20send%20over%20the%20corporate%20sponsorship%20package%2C%20that%20would%20be%20great.%0A%0AThanks%2C%0AYOUR%20NAME`} >
                  <SponsorImage alt="" fluid={data.placeholder.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
            </Flex>
            <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
              <SponsorContainer width={[5 / 12, 6 / 12, 6 / 12]} mx={[1, 2, 3]}>
                <Link to="https://www.rockymountainatvmc.com">
                  <SponsorImage alt="rocky mountain atv mc" fluid={data.rockyMountainAtvMc.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={[5 / 12, 6 / 12, 6 / 12]} mx={[1, 2, 3]}>
                <Link to="https://www.giviusa.com">
                  <SponsorImage alt="givi usa" fluid={data.givi.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
            </Flex>
            <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
              <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
                <Link to="https://www.twistedthrottle.com/">
                  <SponsorImage alt="Twisted Throttle" fluid={data.twistedThrottle.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
                <Link to="https://sw-motech.com/en/">
                  <SponsorImage alt="SW-MotoTech" fluid={data.swMototech.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
                <Link to="https://www.therokkercompany.com/?lang=en">
                  <SponsorImage alt="rokker" fluid={data.rokker.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={3 / 12} mx={[1, 2, 3]}>
                <Link to="https://www.therokkercompany.com/?lang=en">
                  <SponsorImage alt="booz allen hamilton" fluid={data.booz.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
            </Flex>
            <Flex justifyContent="center" flexWrap={['wrap', 'wrap', 'initial']} my={[0, 0, 3]} alignItems='center'>
              <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
                <Link to="https://cycleracks.com/">
                  <SponsorImage alt="cycleracks" fluid={data.cycleracks.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
                <Link to="https://trezor.io//">
                  <SponsorImage alt="trezor" fluid={data.trezor.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
                <Link to={`mailto:info@projectafa.org?&subject=Corporate%20Sponsorship%20Package%20for%20AFA&body=Hi%20there%2C%0A%0AI%20would%20be%20interested%20in%20learning%20more%20about%20the%20corporate%20sponsorship%20packages%20you%20offer%20as%20our%20company%20may%20be%20interested%20in%20supporting%20Adventures%20for%20Alopecia.%0A%0AIf%20you%20could%20send%20over%20the%20corporate%20sponsorship%20package%2C%20that%20would%20be%20great.%0A%0AThanks%2C%0AYOUR%20NAME`} >
                  <SponsorImage alt="" fluid={data.placeholder.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
                <Link to="https://www.ameriprise.com/">
                  <SponsorImage alt="Ameriprise Financial" fluid={data.ameriprise.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
              <SponsorContainer width={2 / 12} mx={[1, 2, 3]}>
                <Link to={`mailto:info@projectafa.org?&subject=Corporate%20Sponsorship%20Package%20for%20AFA&body=Hi%20there%2C%0A%0AI%20would%20be%20interested%20in%20learning%20more%20about%20the%20corporate%20sponsorship%20packages%20you%20offer%20as%20our%20company%20may%20be%20interested%20in%20supporting%20Adventures%20for%20Alopecia.%0A%0AIf%20you%20could%20send%20over%20the%20corporate%20sponsorship%20package%2C%20that%20would%20be%20great.%0A%0AThanks%2C%0AYOUR%20NAME`} >
                  <SponsorImage alt="" fluid={data.placeholder.childImageSharp.fluid} objectFit="contain"/>
                </Link>
              </SponsorContainer>
            </Flex>
            <Flex>
              <Box mt={4}>
                <CtaButton text={section5.sponsorCTAText} type={'secondary'} to={`mailto:info@projectafa.org?&subject=Corporate%20Sponsorship%20Package%20for%20AFA&body=Hi%20there%2C%0A%0AI%20would%20be%20interested%20in%20learning%20more%20about%20the%20corporate%20sponsorship%20packages%20you%20offer%20as%20our%20company%20may%20be%20interested%20in%20supporting%20Adventures%20for%20Alopecia.%0A%0AIf%20you%20could%20send%20over%20the%20corporate%20sponsorship%20package%2C%20that%20would%20be%20great.%0A%0AThank%20you%2C%0AYOUR%20NAME`} />
              </Box>
            </Flex>
          </ContentLayout>
        </div>
      )} />
  )
}

SponsorsComponent.propTypes = {
  section5: homeSection5Type.isRequired
}

export default SponsorsComponent
