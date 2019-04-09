import React from 'react'
import fetch from 'isomorphic-unfetch';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import DonateFiatFormComponent from './DonateFiatFormComponent'

const AboutOrgTitle = styled.h2`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: -1.75px;
	line-height: 66px;
`

const OrgDescription = styled.div`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`

class DonateFormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    if (window.Stripe) { // Stripe has been loaded
      this.setState({
        stripe: window.Stripe(process.env.STRIPE_API_KEY)
      });
      console.log('stripe: ', this.state.stripe);
    } else { // Stripe has not been loaded b/c async
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(process.env.STRIPE_API_KEY) });
      });
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <DonateFiatFormComponent />
        </Elements>
      </StripeProvider>
    )
  }
}

DonateFormComponent.propTypes = {
  // heading1: PropTypes.string.isRequired,
}

export default DonateFormComponent;
