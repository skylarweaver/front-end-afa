import React from 'react'
import styled from 'styled-components'
import { injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'
import DonatePerMile from '../DonatePerMile'
import Loader from '../Loader'
import MarkdownContent from '../MarkdownContent'

const StyledLegalText = styled.p`
	font-size: 14px;
	font-style: italic;
	line-height: 22px;
`

const StyledSubLabel = styled.p`
	font-size: 14px;
	line-height: 22px;
`

const Form = ({ usdDonationContent, handleSubmit, donatePerMileOptionClicked, donationOptions, donationAmount, handleChange, isSubmitted }) => (
  <form onSubmit={handleSubmit}>
    <fieldset disabled={isSubmitted}>
      <StyledLegalText>
        <MarkdownContent content={usdDonationContent.legalText} />
      </StyledLegalText>
      <label>
        <MarkdownContent content={usdDonationContent.field1.label} />
      </label>
      <StyledSubLabel>
        <MarkdownContent content={usdDonationContent.field1.sublabel} />
      </StyledSubLabel>
      <DonatePerMile onClick={donatePerMileOptionClicked} donationAmountOptions={donationOptions} />
      <Box>
        <label>
          <MarkdownContent content={usdDonationContent.field2.label} />
        </label>
        <StyledSubLabel>
          <MarkdownContent content={usdDonationContent.field2.sublabel} />
        </StyledSubLabel>
        <input name="donationAmount" type="number" value="50.00" min="0.01" step="0.01" required value={donationAmount} onChange={handleChange} />
      </Box>
      <MarkdownContent content={usdDonationContent.field3.label} />
      <Box>

        <StyledSubLabel>
          <label>
            Name
          </label>
        </StyledSubLabel>
        <input name="name" type="text" placeholder="Jane Doe" required onChange={handleChange} />
      </Box>
      <Box>
        <StyledSubLabel>
          <label>
            Email
          </label>
        </StyledSubLabel>
        <input
          name="email"
          type="email"
          placeholder="jane.doe@example.com"
          required
          onChange={handleChange}
        />
      </Box>
      <MarkdownContent content={usdDonationContent.field4.label} />
      <Box>
        <CardElement style={{ base: { fontSize: '18px' } }} />
      </Box>
      <Box>
        <label>
          <MarkdownContent content={usdDonationContent.field5.label} />
        </label>
        <textarea name="notes" rows="10" cols="30" placeholder="Optional donation notes" onChange={handleChange} />
      </Box>
      <Box>
        <label>
          <MarkdownContent content={usdDonationContent.anonymous.label} />
        </label>
        <input name="anonymous" type="checkbox" onChange={handleChange} />
      </Box>
    </fieldset>
    {isSubmitted ?
      <Loader />
      :
      <button>Confirm order</button>
    }
  </form>
)

export default injectStripe(Form);  