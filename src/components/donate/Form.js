import React from 'react'
import styled from 'styled-components'
import { injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'
import DonatePerMile from '../DonatePerMile'
import Loader from '../Loader'

const StyledLegalText = styled.p`
	font-size: 14px;
	font-style: italic;
	line-height: 22px;
`

const Form = ({ handleSubmit, donatePerMileOptionClicked, donationOptions, donationAmount, handleChange, isSubmitted }) => (
  <form onSubmit={handleSubmit}>
    <fieldset disabled={isSubmitted}>
    <StyledLegalText>All donations are tax-deductible.</StyledLegalText>
    <StyledLegalText>Adventures for Alopecia is a registered 501(c)(3) nonprofit organization.</StyledLegalText>
    <label>
      Donate per Mile
          <br></br>
    </label>
    <DonatePerMile onClick={donatePerMileOptionClicked} donationAmountOptions={donationOptions} />
    <Box>
      <label>
        Amount
          <br></br>
      </label>
      <input name="donationAmount" type="number" value="50.00" min="0.01" step="0.01" required value={donationAmount} onChange={handleChange} />
    </Box>
    <Box>
      <label>
        Name
          <br></br>
      </label>
      <input name="name" type="text" placeholder="Jane Doe" required onChange={handleChange} />
    </Box>
    <Box>
      <label>
        Email
          <br></br>
      </label>
      <input
        name="email"
        type="email"
        placeholder="jane.doe@example.com"
        required
        onChange={handleChange}
      />
    </Box>
    <Box>
      <label>
        Card details
        <CardElement style={{ base: { fontSize: '18px' } }} />
      </label>
    </Box>
    <Box>
      <label>
        Donation Notes <span>(Optional)</span>
      </label>
      <br></br>
      <textarea name="notes" rows="10" cols="30" placeholder="Optional donation notes" onChange={handleChange} />
    </Box>
    <Box>
      <label>
        Anonymous donation?
          <br></br>
      </label>
      <input name="anonymous" type="checkbox" onChange={handleChange} />
    </Box>
    </fieldset>
    { isSubmitted ? 
      <Loader />
      :
      <button>Confirm order</button>
    }
  </form>
)

export default injectStripe(Form);  