import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'
import CtaButton from '../CtaButton'
import Link from '../GatsbyLink'
import IrsApproval from '../../img/documents/AFA_IRS_501c3_Approval.pdf'
import MailDonation from '../../img/documents/AFA_Mail_Donation.pdf'

const OrgDescription = styled.div`
	font-size: 18px;
	letter-spacing: 0.4px;
  line-height: 24px;
  & > div > p:first-child { 
    margin-top: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    display: none;
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
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin-top: 0px;
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
        Adventures for Alopecia is a <Link pdf to={IrsApproval}>registered 501(c)(3) nonprofit organization.</Link> <br></br>
        Donations are also welcome through our <Link pdf to={MailDonation}>mail-in donation form</Link>
      </StyledLegalText>
    </div>
  )
}

DonateContentComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default DonateContentComponent;
