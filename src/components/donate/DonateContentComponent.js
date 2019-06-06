import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'
import Link from '../GatsbyLink'
import IrsApproval from '../../img/documents/AFA_IRS_501c3_Approval.pdf'
import MailDonation from '../../img/documents/AFA_Mail_Donation.pdf'
import naafLogo from '../../img/logos/naaf.png'
import capLogo from '../../img/logos/cap.png'

const OrgDescription = styled.div`
	font-size: 18px;
	letter-spacing: 0.4px;
  line-height: 24px;
  & > div > p:first-child { 
    margin-top: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin-top: 20px;
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
  display: ${props => props.top ? 'none' : 'initial'};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin-top: 0px;
    display: ${props => props.top ? 'initial' : 'none'};
  }
`
const PartnersSection = styled.div`
`

const PartnersHeading = styled.h4`
  margin-bottom: 20px;
`

const ImageContainer = styled(Flex)`
`

const PartnerImage = styled.img`
  max-width: 100%;
  max-height: 150px;
`

const DonateContentComponent = ({ className, heading, description, children }) => {
  return (
    <div className={className}>
      <StyledLegalText top>
        All donations are tax-deductible. <br></br>
        Adventures for Alopecia is a <Link pdf to={IrsApproval}>registered 501(c)(3) nonprofit organization.</Link> <br></br>
        Donations are also welcome through our <Link pdf to={MailDonation}>mail-in donation form</Link>
      </StyledLegalText>
      <OrgDescription>
        <MarkdownContent content={description} />
      </OrgDescription>
      <StyledLegalText bottom>
        All donations are tax-deductible. <br></br>
        Adventures for Alopecia is a <Link pdf to={IrsApproval}>registered 501(c)(3) nonprofit organization.</Link> <br></br>
        Donations are also welcome through our <Link pdf to={MailDonation}>mail-in donation form</Link>
      </StyledLegalText>
      <PartnersSection>
        <PartnersHeading>
          Our Partners
      </PartnersHeading>
        <ImageContainer alignItems='center' justifyContent='left'>
          <Box width={[6 / 12]} mr={[4, 4, 4]}>
            <Link to="https://www.naaf.org/research">
              <PartnerImage alt="NAAF Logo" src={naafLogo}></PartnerImage>
            </Link>
          </Box>
          <Box width={[6 / 12]}>
            <Link to="https://www.childrensalopeciaproject.org">
              <PartnerImage alt="CAP Logo" src={capLogo}></PartnerImage>
            </Link>
          </Box>
        </ImageContainer>
      </PartnersSection>
    </div >
  )
}

DonateContentComponent.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default DonateContentComponent;
