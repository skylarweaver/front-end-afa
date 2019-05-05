import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

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
        Your donation has been processed. You should receive email confirmation soon
        confirming your  <DonationAmountSpan>tax-deductible</DonationAmountSpan> donation of <DonationAmountSpan>{donationAmount}</DonationAmountSpan>. Thank you for helping those living
        with alopecia.
      </p>
      <p>
        Track the adventure on our <Link to='map'>interactive map</Link>!
        Follow our story on <a to='https://www.instagram.com/sky_earth_water/' target="_blank">Instagram</a>!
      </p>
    </Flex>
  )
}

export default SuccessDonation;  