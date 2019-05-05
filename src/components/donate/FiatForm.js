import React from 'react'
import styled from 'styled-components'
import { injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'
import DonatePerMile from '../DonatePerMile'
import Input from '../Input'
import Loader from '../Loader'
import CtaButton from '../CtaButton'
import MarkdownContent from '../MarkdownContent'

const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`

const StyledInputSection = styled.h4`
  color:  ${props => props.theme.tertiary};
  margin-top: 30px;
  margin-bottom: 5px;
  &:first-of-type {
    margin-top: 0px;
  }
`

const StyledSubLabel = styled.p`
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 5px;
`

const AnonymousLabel = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color:  ${props => props.theme.tertiary};
`

const DonationAmountInput = styled.div`
  max-width: 50%;
  & > input {
    min-width: 200px;
  }
`

const StyledCardElementContainer = styled.div`
    height: 50px;
    border: solid 1px #cfcfcf;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding-left: 20px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${props => props.theme.tertiary}
    &::placeholder {
      letter-spacing: normal;
      color:  ${props => props.theme.greyNeutral};
    }
    &:focus {
      outline-color: ${props => props.theme.tertiary};
    }
`

const DonateButton = styled.button`
  padding-left: 60px;
  padding-right: 60px;
  margin: 16px 0;
  min-width: 175px;
  height: 50px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  border: solid 2px ${props => props.theme.primary};
  box-sizing: border-box;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 100%;
  }
`

const Form = ({ usdDonationContent, handleSubmit, donatePerMileOptionClicked, donationOptions, donationAmount, name, email, donationNotes, anonymous, handleChange, isSubmitted }) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledFieldset disabled={isSubmitted}>
        <Flex flexDirection="column">
          <StyledInputSection>
            Donation Amount
          </StyledInputSection>
          <StyledSubLabel>
            {usdDonationContent.field1.sublabel}
          </StyledSubLabel>
          <DonatePerMile onClick={donatePerMileOptionClicked} donationAmountOptions={donationOptions} />
          <StyledSubLabel>
            {usdDonationContent.field2.sublabel}
          </StyledSubLabel>
          <DonationAmountInput>
            <Input label="Donation Amount"
              name="donationAmount"
              placeholder="Donation Amount"
              type="text"
              value="$50.00"
              required={true}
              value={donationAmount}
              onChange={handleChange}
            />
          </DonationAmountInput>
          <StyledInputSection>
            {usdDonationContent.field3.label}
          </StyledInputSection>
          <Input
            label="Name"
            name="name"
            type="text"
            value={name}
            placeholder="Name"
            required={true}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            required={true}
            onChange={handleChange}

          />
          <StyledInputSection>
            {usdDonationContent.field4.label}
          </StyledInputSection>
          <StyledCardElementContainer>
            <CardElement style={{
              base: {
                iconColor: '#015558',
                lineHeight: '50px',
                fontFamily: 'Roboto',
                fontSize: '16px',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal',
                letterSpacing: 'normal',
                color: '#4a4a4a',
                '::placeholder': {
                  color: '#9b9b9b',
                }
              }
            }} />
          </StyledCardElementContainer>
          <StyledInputSection>
            Optional Information
          </StyledInputSection>
          <Input label={usdDonationContent.field5.label} name="notes"
            placeholder="Donation notes (optional)"
            value={donationNotes}
            onChange={handleChange}
            inputType="textarea"
          />
          <Flex alignItems="center">
            <AnonymousLabel>
              Share {usdDonationContent.anonymous.label}ly?
            </AnonymousLabel>
            <input name="anonymous"
              type="checkbox"
              value={anonymous}
              onChange={handleChange}
            />
          </Flex>
        </Flex>
        {
          isSubmitted ?
            <Loader />
            :
            <DonateButton>Submit Donation</DonateButton>
        }
      </StyledFieldset>
    </form >
  )
}

export default injectStripe(Form);  