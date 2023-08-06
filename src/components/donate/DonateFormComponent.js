import React from 'react'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { StripeProvider, Elements } from 'react-stripe-elements';
import { usdDonationPropTypes, cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import DonateFiatFormComponent from './DonateFiatFormComponent'
import DonateCryptoFormComponent from './DonateCryptoFormComponent'
import DonateTypeButton from '../DonateTypeButton'
import { Transition } from "react-transition-group"
import Link from '../GatsbyLink'

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
  // display: ${({ transitionState }) => (transitionState === "exited" ? "none" : "block")};

  transition: 300ms;
  opacity: ${({ transitionState }) => (transitionState === "entered" ? 1 : 0)};
`

const StyledDonateFiatFormComponent = styled(DonateFiatFormComponent)`
  transition: 300ms;
  opacity: ${({ transitionState }) => (transitionState === "entered" ? 1 : 0)};
`

const StyledInputSection = styled.h4`
  color:  ${props => props.theme.tertiary};
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-of-type {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const StyledSubLabel = styled.p`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-style: italic;
`

class DonateFormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stripe: null,
      showFiatForm: true,
      showTypeToggles: true,
    };

    this.handleFiatToggle = this.handleFiatToggle.bind(this);
    this.handleCryptoToggle = this.handleCryptoToggle.bind(this);
    this.showHideTypeToggles = this.showHideTypeToggles.bind(this);
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
  showHideTypeToggles() { // Hide type toggles after user submits
    this.setState({
      showTypeToggles: !this.state.showTypeToggles,
    });
  }

  render() {
    return (
      <div>
        {this.state.showTypeToggles && // Hide fiat toggles after user submits
          <div>
            <StyledInputSection>
              Thank you for your support
            </StyledInputSection>
            {/*
            <StyledSubLabel>
              Choose which type of currency you wish to donate:
            </StyledSubLabel>
            <Flex mx={[-2, -2, 0]} mt={[2]} mb={[4, 4, 4]}>
              <DonateTypeButton text={'Donate USD'} active={this.state.showFiatForm} onClick={this.handleFiatToggle} />
              <DonateTypeButton text={'Donate Crypto'} active={!this.state.showFiatForm} onClick={this.handleCryptoToggle} />
            </Flex>
             */}
            <StyledSubLabel>
            Donations are currently closed as we wind down operations of AFA and redistribute the funds we raised to continue to support the cause.
            <br></br>
            <br></br>
            To read the adventure summary report and next steps, see our final email <Link to="https://www.instagram.com/adventuresforalopecia" rel="noopener">here</Link>.
            <br></br>
            <br></br>
            If you would like to contribute to Alopecia Support, we suggest donating to National Alopecia Areata Foundation, Children's Alopecia Project, or any one of the other mnany great nonprofits that exist for Alopecia.
            </StyledSubLabel>
          </div>
        }
        {/* 
        <Transition
          in={this.state.showFiatForm}
          timeout={50}
          unmountOnExit
          mountOnEnter>
          {transitionState => (
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <StyledDonateFiatFormComponent usdDonation={this.props.usdDonation} transitionState={transitionState} showHideTypeToggles={this.showHideTypeToggles} />
              </Elements>
            </StripeProvider>
          )}
        </Transition>
        <Transition
          in={!this.state.showFiatForm}
          timeout={50}
          unmountOnExit
          mountOnEnter>
          {transitionState => (
            <StyledDonateCryptoFormComponent cryptoDonation={this.props.cryptoDonation} transitionState={transitionState} />
          )}
        </Transition>
        */}
      </div>
    )
  }
}

DonateFormComponent.propTypes = {
  usdDonation: usdDonationPropTypes,
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateFormComponent;
