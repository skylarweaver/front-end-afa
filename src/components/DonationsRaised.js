import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex } from '@rebass/grid'
import CtaButton from './CtaButton'
const AmountRaisedContainer = styled(Flex)`
  width: 235px;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffffff;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    flex-wrap: wrap;
  }
`

const RaisedText = styled.p`
  maring-left: 5px;
  font-size: 12px;
  color: ${props => props.theme.secondary};
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin-top: -4px;
  }
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
  white-space: nowrap;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    margin: 1px 0 0 0;
  }
`

const DonateButton = styled(CtaButton)`
  & > button {
    margin: 0px;
  }
`

const DonationsRaised = ({ className, donationAmount = '1,000' }) => {

  return (
    <div>
      <Flex>
        <AmountRaisedContainer alignItems='center' justifyContent="space-between">
          <AmountRaisedText>{`$ ${donationAmount}`}</AmountRaisedText>
          <RaisedText>Raised for Alopecia</RaisedText>
        </AmountRaisedContainer>
        <DonateButton text={'Final Report'} to={'https://mailchi.mp/2290b7299c97/afa-adventure-report-2023'} type={'primary'} />
      </Flex>
    </div>
  )
}

DonationsRaised.propTypes = {
  className: PropTypes.object,
  donationAmount: PropTypes.string
}

export default DonationsRaised;
