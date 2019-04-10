import React from 'react'
import fetch from 'isomorphic-unfetch';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import DonatePerMile from '../DonatePerMile'

const StyledLegalText = styled.p`
	font-size: 14px;
	font-style: italic;
	line-height: 22px;
`

class StripeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donationAmount: 50.00,
      name: '',
      email: '',
      canMakePayment: false,
      notes: '',
      anonymous: false,
      donationOptions: [
        { "amount": "0.003", "selected": false },
        { "amount": "0.01", "selected": false },
        { "amount": "0.10", "selected": false },
        { "amount": "0.25", "selected": false },
        { "amount": "0.50", "selected": false },
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.donatePerMileOptionClicked = this.donatePerMileOptionClicked.bind(this)
  }

  donatePerMileOptionClicked(e, donationObject, index) {
    e.preventDefault();
    // Set all selected attributes to false
    let newDonationOptions = this.state.donationOptions.map(obj => { obj.selected = false; return obj });
    newDonationOptions[index].selected = true;
    this.setState({
      donationAmount: donationObject.amount * 15000,
      donationOptions: newDonationOptions,
    });
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
  }

  handleSubmit = async (event) => {
    console.log('event: ', event);
    const donationAmount = parseInt(this.state.donationAmount * 100); // Stripe takes amounts coverted to pennies
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();
    if (this.props.stripe) {
      try {
        console.log('this.state.name: ', this.state.name);
        const payload = await this.props.stripe.createToken({ name: this.state.name })

        console.log('[token]', payload);
        this.submitStripeTokenToBackend(payload.token.id, donationAmount);
      } catch (error) {
        console.log('Stripe error: ', error);
      }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  submitStripeTokenToBackend = async (tokenId, donationAmount) => {
    console.log('tokenId: ', tokenId);
    const stripeRes = await fetch(process.env.SERVER_CHARGES_URL, { // POST to our backend server with the token and charge details  crossDomain:true,
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify({
        tokenId,
        charge: {
          amount: donationAmount,
          currency: 'USD',
        },
      }),
    });
    const stripeData = await stripeRes.json();
    console.log('stripeData: ', stripeData);
    await this.submitDonationToGoogleSheet();
  }

  submitDonationToGoogleSheet = async () => {
    const sheetRes = await fetch(process.env.SERVER_UPDATE_SHEET_URL, {
      crossDomain: true,
      method: 'POST',
      body: JSON.stringify({
        date: new Date().toLocaleString('en-US'),
        name: this.state.name,
        email: this.state.email,
        donationAmount: this.state.donationAmount,
        anonymous: this.state.anonymous,
        notes: this.state.notes,
        stripeMode: this.props.stripe._keyMode,
      }),
    });
    const sheetData = await sheetRes.json();
    console.log('sheetData: ', sheetData);
  }

  handleBlur = () => {
    console.log('[blur]');
  };
  handleClick = () => {
    console.log('[click]');
  };
  handleFocus = () => {
    console.log('[focus]');
  };
  handleReady = () => {
    console.log('[ready]');
  };

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <StyledLegalText>All donations are tax-deductible.</StyledLegalText>
        <StyledLegalText>Adventures for Alopecia is a registered 501(c)(3) nonprofit organization.</StyledLegalText>
        <label>
          Donate per Mile
            <br></br>
        </label>
        <DonatePerMile onClick={this.donatePerMileOptionClicked} donationAmountOptions={this.state.donationOptions} />
        <Box>
          <label>
            Amount
            <br></br>
          </label>
          <input name="donationAmount" type="number" value="50.00" min="0.01" step="0.01" required value={this.state.donationAmount} onChange={this.handleChange} />
        </Box>
        <Box>
          <label>
            Name
            <br></br>
          </label>
          <input name="name" type="text" placeholder="Jane Doe" required onChange={this.handleChange} />
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
            onChange={this.handleChange}
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
          <textarea name="notes" rows="10" cols="30" placeholder="Optional donation notes" required onChange={this.handleChange} />
        </Box>
        <Box>
          <label>
            Anonymous donation?
            <br></br>
          </label>
          <input name="anonymous" type="checkbox" onChange={this.handleChange} />
        </Box>
        <button>Confirm order</button>
      </form>
    )
  }
}

StripeFormComponent.propTypes = {
  // heading1: PropTypes.string.isRequired,
}

const DonateFiatFormComponent = injectStripe(StripeFormComponent);

export default DonateFiatFormComponent;
