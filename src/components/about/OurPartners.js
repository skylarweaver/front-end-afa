import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { aboutPartnersSectionType } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import ContentLayout from '../ContentLayout'
import MarkdownContent from '../MarkdownContent'
import Link from '../GatsbyLink'
import Image from 'gatsby-image/withIEPolyfill'

const OurPartnersHeading = styled.h2`
`

const PartnerImage = styled(Image)`
  max-width: 100%;
  max-height: 200px;
`

const PartnerLink = styled(Link)`
  width: 100%;
  height: 100%;
`

const PartnerDescription = styled(MarkdownContent)`
  margin-top: 0px;
`

const ImageContainer = styled(Flex)`
  height: 200px;
`

const OurPartners = ({ className, aboutPartnersSection }) => {
  return (
    <StaticQuery query={graphql`
      query {
        naafLogo: file(relativePath: { eq: "logos/naaf.png" }) {
          childImageSharp {
            fluid(quality: 100, maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        capLogo: file(relativePath: { eq: "logos/cap.png" }) {
          childImageSharp {
            fluid(quality: 100, maxHeight: 200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
      render={data => (
        <ContentLayout className={className}>
          <OurPartnersHeading>
            {aboutPartnersSection.section}
          </OurPartnersHeading>
          <Flex flexWrap={['wrap', 'wrap', 'initial']}>
            <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
              <ImageContainer alignItems='center' justifyContent='center'>
                <PartnerLink to="https://www.naaf.org/research">
                  <PartnerImage alt="National Alopecia Areata Foundation Logo" fluid={data.naafLogo.childImageSharp.fluid} objectFit="contain" />
                </PartnerLink>
              </ImageContainer>
              <PartnerDescription content={aboutPartnersSection.partner1.description} />
            </Box>
            <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
              <ImageContainer alignItems='center' justifyContent='center'>
                <PartnerLink to="https://www.childrensalopeciaproject.org">
                  <PartnerImage alt="Children's Alopecia Project Logo" fluid={data.capLogo.childImageSharp.fluid} objectFit="contain" />
                </PartnerLink>
              </ImageContainer>
              <PartnerDescription content={aboutPartnersSection.partner2.description} />
            </Box>
          </Flex>
        </ContentLayout>
      )} />
  )
}

OurPartners.propTypes = {
  aboutPartnersSection: aboutPartnersSectionType.isRequired
}

export default OurPartners
