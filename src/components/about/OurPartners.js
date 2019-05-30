import React from 'react'
import styled from 'styled-components'
import { aboutPartnersSectionType } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import ContentLayout from '../ContentLayout'
import MarkdownContent from '../MarkdownContent'
import Link from '../GatsbyLink'
import naafLogo from '../../img/logos/naaf.png'
import capLogo from '../../img/logos/cap.png'

const OurPartnersHeading = styled.h2`
`

// const Partner = styled.h4`
//   @media (max-width: ${props => props.theme.breakpoints[1]}) {
//     margin-bottom: 0px;
//   }
// `

const PartnerImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`

const PartnerDescription = styled(MarkdownContent)`
  margin-top: 0px;
`

const ImageContainer = styled(Flex)`
  height: 200px;
`


const OurPartners = ({ className, aboutPartnersSection }) => {
  console.log('aboutPartnersSection: ', aboutPartnersSection);

  return (
    <ContentLayout className={className}>
      <OurPartnersHeading>
        {aboutPartnersSection.section}
      </OurPartnersHeading>
      <Flex flexWrap={['wrap', 'wrap', 'initial']}>
        <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
          <ImageContainer alignItems='center' justifyContent='center'>
            <Link to="https://www.naaf.org/research">
              <PartnerImage alt="NAAF Logo" src={naafLogo}></PartnerImage>
            </Link>
          </ImageContainer>
          <PartnerDescription content={aboutPartnersSection.partner1.description} />
        </Box>
        <Box width={[1, 1, 6 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
          <ImageContainer alignItems='center' justifyContent='center'>
            <Link to="https://www.childrensalopeciaproject.org">
              <PartnerImage alt="CAP Logo" src={capLogo}></PartnerImage>
            </Link>
          </ImageContainer>
          <PartnerDescription content={aboutPartnersSection.partner2.description} />
        </Box>
      </Flex>
    </ContentLayout>
  )
}

OurPartners.propTypes = {
  aboutPartnersSection: aboutPartnersSectionType.isRequired
}

export default OurPartners
