import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const StyledInputSection = styled.h4`
  margin-top: 30px;
  margin-bottom: 5px;
`

const SuccessDonation = ({ donationAmount }) => {
  return (
    <Flex flexDirection="column">
      <StyledInputSection>
        Thank you for your donation!
      </StyledInputSection>
      <p>
        Your donation has been processed. You should receive email confirmation soon
        confirming your tax-deductible donation of {donationAmount}. Thank you for helping those living
        with alopecia.
      </p>
      <p>
        Follow the adventure on our <Link to='map'>interactive map</Link>!
      </p>
    </Flex>
  )
}

export default SuccessDonation;  