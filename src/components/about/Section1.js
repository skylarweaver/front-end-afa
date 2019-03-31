import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection1Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

const AboutOrgTitle = styled.h2`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: -1.75px;
	line-height: 66px;
`

const OrgDescription = styled.p`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`

const AboutOrganizationComponent = ({ className, section1 }) => {
  console.log('section1: ', section1);

  return (
    <div className={className}>
      <AboutOrgTitle>
        {section1.heading1}
      </AboutOrgTitle>
      <OrgDescription>
        {section1.description1}
      </OrgDescription>
    </div>
  )
}

AboutOrganizationComponent.propTypes = {
  section1: aboutSection1Type.isRequired
}

export default AboutOrganizationComponent
