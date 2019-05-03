import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid'
import CtaButton from './CtaButton'
const AmountRaisedContainer = styled(Flex)`
  width: 293px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffffff;
`

const RaisedText = styled.p`
  font-size: 12px;
  color: ${props => props.theme.secondary};
`

const AmountRaisedText = styled.p`
  font-family: Vidaloka;
  font-size: 28px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => props.theme.tertiary};
`

const DonateButton = styled(CtaButton)`
  & > button {
    margin: 0px;
  }
`

const DonationsRaised = ({ className, donationAmount = '$20,000' }) => {

  return (
    <div>
      <Flex>
        <AmountRaisedContainer alignItems='center' justifyContent="space-between">
          <AmountRaisedText>$ {donationAmount}</AmountRaisedText>
          <RaisedText>Raised for Alopecia</RaisedText>
        </AmountRaisedContainer>
        <DonateButton text={'Donate'} to={'/donate'} type={'primary'} />
      </Flex>
    </div>
  )
}

DonationsRaised.propTypes = {
  className: PropTypes.object,
  donationAmount: PropTypes.string
}

export default DonationsRaised;
