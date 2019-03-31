import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { homeSection4Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

const AboutOrgTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const OrgDescription = styled.h2`
	font-size: 16px;
	line-height: 24px;
`

const AboutOrgImage = styled.p`
`

const AboutOrganizationComponent = ({ className, section4 }) => {
  console.log('section4: ', section4);

  return (
    <div className={className}>
      <AboutOrgTitle name="About-AFA">
        {section4.section}
      </AboutOrgTitle>
      <Flex>
        <Box width={6 / 12}>
          <OrgDescription>
            {section4.content}
          </OrgDescription>
        </Box>
        <Box width={6 / 12}>
          <AboutOrgImage>
            Image of someone with aloecia
          </AboutOrgImage>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <CtaButton text={section4.donateCTAtext} to={'/donate'} type={'primary'}/>
        </Box>
        <Box>
          <CtaButton text={section4.learnMoreCTAText} to={'/about'} type={'secondary'}/>
        </Box>
      </Flex>
    </div>
  )
}

AboutOrganizationComponent.propTypes = {
  section4: homeSection4Type.isRequired
}

export default AboutOrganizationComponent
