import React from 'react'
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import { usdDonationPropTypes, cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import DonateFiatFormComponent from './DonateFiatFormComponent'
import DonateCryptoFormComponent from './DonateCryptoFormComponent'

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
        {/* <Flex> */}
          {/* <DonateTypeButton text={'Donate USD'} active={this.state.showFiatForm} onClick={this.handleFiatToggle} /> */}
          {/* <DonateTypeButton text={'Donate Crypto'} active={!this.state.showFiatForm} onClick={this.handleCryptoToggle} /> */}
        {/* </Flex> */}
        {this.state.showFiatForm ?
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <DonateFiatFormComponent usdDonation={this.props.usdDonation}/>
            </Elements>
          </StripeProvider>
          :
          <DonateCryptoFormComponent cryptoDonation={this.props.cryptoDonation}/>
        }
      </div>
    )
  }
}

DonateFormComponent.propTypes = {
  usdDonation: usdDonationPropTypes,
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateFormComponent;
