import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'
import CtaButton from '../CtaButton'

const AboutOrgTitle = styled.h2`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: -1.75px;
	line-height: 66px;
`

const OrgDescription = styled.div`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`

const DonateContentComponent = ({ className, heading, description, children }) => {
  return (
    <div className={className}>
      <AboutOrgTitle>
        {heading}
      </AboutOrgTitle>
      <OrgDescription>
        <MarkdownContent content={description} />
      </OrgDescription>
      <a href="/documents/AFA_Mail_Donation.pdf" target="_blank">Mail-in donation form</a>
    </div>
  )
}

DonateContentComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default DonateContentComponent;
