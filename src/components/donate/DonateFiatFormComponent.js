import React from 'react'
import fetch from 'isomorphic-unfetch';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
    // console.log('event.target.name: ', event.target.name);
    // console.log('event.target.value: ', value);
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  // console.log('props: ', this.props);
  //  paymentRequest;
  // console.log('props.stripe: ', this.props.stripe);
  // if (props.stripe !== null) {

  //   paymentRequest = props.stripe.paymentRequest({
  //     country: 'US',
  //     currency: 'usd',
  //     total: {
  //       label: 'Demo total',
  //       amount: 1000,
  //     },
  //   });

  //   paymentRequest.on('token', ({ complete, token, ...data }) => {
  //     console.log('Received Stripe token: ', token);
  //     console.log('Received customer information: ', data);
  //     complete('success');
  //   });

  //   paymentRequest.canMakePayment().then((result) => {
  //     canMakePayment = !!result;
  //   });
  //   console.log('canMakePayment: ', canMakePayment);
  // }

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
        {this.props.stripe !== null && this.canMakePayment ?
          <PaymentRequestButtonElement
            className="PaymentRequestButton"
            // onBlur={handleBlur}
            // onClick={handleClick}
            // onFocus={handleFocus}
            // onReady={handleReady}
            // paymentRequest={paymentRequest}
            style={{
              paymentRequestButton: {
                theme: 'dark',
                height: '64px',
                type: 'donate',
              },
            }}
          />
          : null}
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
