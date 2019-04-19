import React from 'react'
import axios from 'axios';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import Image from 'gatsby-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import DonateTypeButton from '../DonateTypeButton'
import DonateFiatFormComponent from './DonateFiatFormComponent'
import DonateCryptoFormComponent from './DonateCryptoFormComponent'


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
      stripe: null,
      showFiatForm: true,
    };
    
    this.handleFiatToggle = this.handleFiatToggle.bind(this);
    this.handleCryptoToggle = this.handleCryptoToggle.bind(this);
  }

  componentDidMount() {
    if (window.Stripe) { // Stripe has been loaded
      this.setState({
        stripe: window.Stripe(process.env.STRIPE_PUBLIC_API_KEY)
      });
    } else { // Stripe has not been loaded b/c async
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({ stripe: window.Stripe(process.env.STRIPE_PUBLIC_API_KEY) });
      });
    }
  }

  handleFiatToggle() {
    this.setState({ showFiatForm: true })
  }
  handleCryptoToggle() {
    this.setState({ showFiatForm: false })
  }

  render() {
    return (
      <div>
        <Flex>
          <DonateTypeButton text={'Donate USD'} active={this.state.showFiatForm} onClick={this.handleFiatToggle} />
          <DonateTypeButton text={'Donate Crypto'} active={!this.state.showFiatForm} onClick={this.handleCryptoToggle} />
        </Flex>
        {this.state.showFiatForm ?
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <DonateFiatFormComponent />
            </Elements>
          </StripeProvider>
          :
          <DonateCryptoFormComponent />
        }
      </div>
    )
  }
}

DonateFormComponent.propTypes = {
  // heading1: PropTypes.string.isRequired,
}

export default DonateFormComponent;
