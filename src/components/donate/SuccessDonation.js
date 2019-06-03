import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import Link from '../GatsbyLink'

const StyledInputSection = styled.h4`
  margin-top: 30px;
  margin-bottom: 5px;
`
const DonationAmountSpan = styled.span`
  font-weight: bold;
`

const SuccessDonation = ({ donationAmount }) => {
  return (
    <Flex flexDirection="column">
      <StyledInputSection>
        Thank you for your donation!
      </StyledInputSection>
      <p>
        Your donation has been processed. You should receive an email soon
        confirming your <DonationAmountSpan>tax-deductible</DonationAmountSpan> donation of <DonationAmountSpan>{donationAmount}</DonationAmountSpan>. Thank you for helping those living
        with alopecia.
      </p>
      <p>
        Track the adventure on our <Link to='map'>interactive map</Link>!
      </p>
      <p>
        And follow our story on <Link to='https://www.instagram.com/sky_earth_water/'>Instagram</Link>!
      </p>
    </Flex>
  )
}

export default SuccessDonation;  