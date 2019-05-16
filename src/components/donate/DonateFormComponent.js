import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { usdDonationPropTypes, cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import DonateFiatFormComponent from './DonateFiatFormComponent'
import DonateCryptoFormComponent from './DonateCryptoFormComponent'
import DonateTypeButton from '../DonateTypeButton'
import { Transition } from "react-transition-group"

const StyledDonateCryptoFormComponent = styled(DonateCryptoFormComponent)`
  //     switch (state) {
  //       case "entering":
  //         return "red"
  //       case "entered":
  //         return "blue"
  //       case "exiting":
  //         return "green"
  //       case "exited":
  //         return "yellow"
  //     }
  // display: ${({ state }) => (state === "exited" ? "none" : "block")};

  transition: 1s;
  opacity: ${({ state }) => (state === "entered" ? 1 : 0)};
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
        <Flex mx={[-2, -2, 0]} mb={[4, 4, 4]}>
          <DonateTypeButton text={'Donate USD'} active={this.state.showFiatForm} onClick={this.handleFiatToggle} />
          <DonateTypeButton text={'Donate Crypto'} active={!this.state.showFiatForm} onClick={this.handleCryptoToggle} />
        </Flex>

        {/* {this.state.showFiatForm ? */}
        <Transition
          in={this.state.showFiatForm}
          timeout={50}
          unmountOnExit
          mountOnEnter>
          {state => (
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <DonateFiatFormComponent usdDonation={this.props.usdDonation} state={state} />
              </Elements>
            </StripeProvider>
          )}
        </Transition>
        <Transition
          in={!this.state.showFiatForm}
          timeout={50}
          unmountOnExit
          mountOnEnter>
          {state => (
            <StyledDonateCryptoFormComponent cryptoDonation={this.props.cryptoDonation} state={state} />
          )}
        </Transition>
      </div>
    )
  }
}

DonateFormComponent.propTypes = {
  usdDonation: usdDonationPropTypes,
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateFormComponent;
