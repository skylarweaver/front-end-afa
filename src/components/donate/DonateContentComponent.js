import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
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

const DonateContentComponent = ({ className, heading1, description, description2 }) => {

  return (
    <div className={className}>
      <AboutOrgTitle>
        {heading1}
      </AboutOrgTitle>
      <OrgDescription>
        {description}
        {description2}
      </OrgDescription>
    </div>
  )
}

DonateContentComponent.propTypes = {
  section1: donatePropTypes.isRequired
}

export default DonateContentComponent;
