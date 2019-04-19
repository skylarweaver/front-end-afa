import React from 'react'
import axios from 'axios';
import { injectStripe } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import FiatForm from './FiatForm'


class StripeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      loaded: false,
      failed: false,
      donationAmount: 50.00,
      name: '',
      email: '',
      canMakePayment: false,
      notes: '',
      anonymous: false,
      donationOptions: [
        { "amount": "0.003", "selected": false },
        { "amount": "0.01", "selected": false },
        { "amount": "0.03", "selected": false },
        { "amount": "0.06", "selected": false },
        { "amount": "0.10", "selected": false },
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
    this.setState({ submitted: true });
    const donationAmount = parseInt(this.state.donationAmount * 100); // Stripe takes amounts coverted to pennies
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();
    if (this.props.stripe) {
      try {
        console.log('this.state.name: ', this.state.name);
        const payload = await this.props.stripe.createToken({ name: this.state.name })
        console.log('[token]', payload);
        await this.submitStripeTokenToBackend(payload.token.id, donationAmount);
        this.setState({ loaded: true });
      } catch (error) {
        console.log('Stripe error: ', error);
        this.setState({ loaded: true, failed: true });
      }
    } else {
      console.log("Stripe.js hasn't loaded yet or stripe token creation failure.");
      this.setState({ loaded: true, failed: true });
    }
  };

  submitStripeTokenToBackend = async (tokenId, donationAmount) => {
    console.log('tokenId: ', tokenId);
    try {
      const stripeData = await axios.post(process.env.SERVER_CHARGES_URL, { // POST to our backend server with the token and charge details  crossDomain:true,
        tokenId,
        charge: {
          amount: donationAmount,
          currency: 'USD',
        },
      });
      console.log('stripeData: ', stripeData);
      return await this.submitDonationToGoogleSheet();
    } catch (err) {
      console.log('err: ', err);
      throw err
    }
  }

  submitDonationToGoogleSheet = async () => {
    try {
      const sheetData = await axios.post(process.env.SERVER_UPDATE_SHEET_URL, {
        date: new Date().toLocaleString('en-US'),
        name: this.state.name,
        email: this.state.email,
        donationAmount: this.state.donationAmount,
        anonymous: this.state.anonymous,
        notes: this.state.notes,
        stripeMode: this.props.stripe._keyMode,
      });
      console.log('sheetData: ', sheetData);
      return sheetData;
    } catch (err) {
      console.log('err: ', err);
      throw err
    }
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
    if (!this.state.loaded) {
      return (
        <div>
          <FiatForm handleSubmit={this.handleSubmit}
            donatePerMileOptionClicked={this.donatePerMileOptionClicked}
            donationOptions={this.state.donationOptions}
            donationAmount={this.state.donationAmount}
            handleChange={this.handleChange}
            isSubmitted={this.state.submitted}
          />
        </div>
      )
    } else if (this.state.submitted && this.state.loaded && !this.state.failed) {
      return (
        <div>
          SUCCESS
        </div>
      )
    } else if (this.state.submitted && this.state.failed) {
      return (
        <div>
          FAILED
        </div>
      )
    }

    return
  }
}

StripeFormComponent.propTypes = {
  // heading1: PropTypes.string.isRequired,
}

const DonateFiatFormComponent = injectStripe(StripeFormComponent);

export default DonateFiatFormComponent;
