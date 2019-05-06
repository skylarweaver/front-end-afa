import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'
import CtaButton from '../CtaButton'

const OrgDescription = styled.div`
	font-size: 18px;
	letter-spacing: 0.4px;
  line-height: 24px;
  & > div > p:first-child { 
    margin-top: 0;
  }
`

const StyledLegalText = styled.p`
  margin-top: 25px;
  font-size: 14px;
  font-style: italic;
  line-height: 22px;
  & > div > p {
    font-size: 12px;
    font-style: italic;
    line-height: 22px;
  }
`

const DonateContentComponent = ({ className, heading, description, children }) => {
  return (
    <div className={className}>
      <OrgDescription>
        <MarkdownContent content={description} />
      </OrgDescription>
      <StyledLegalText>
        All donations are tax-deductible. <br></br>
        Adventures for Alopecia is a <a href="/documents/AFA_IRS_501c3_Approval.pdf" target="_blank" rel="noopener noreferrer">registered 501(c)(3) nonprofit organization.</a> <br></br>
        Donations are also welcome through our <a href="/documents/AFA_Mail_Donation.pdf" target="_blank" rel="noopener noreferrer">mail-in donation form</a>
      </StyledLegalText>
    </div>
  )
}

DonateContentComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default DonateContentComponent;
