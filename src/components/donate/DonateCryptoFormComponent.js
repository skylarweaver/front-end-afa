import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import MarkdownContent from '../MarkdownContent'

const StyledLegalText = styled.p`
	font-size: 14px;
	font-style: italic;
	line-height: 22px;
`
const StyledStepNumber = styled.h3`
	font-size: 28px;
	font-weight: bold;
	letter-spacing: -0.98px;
	line-height: 37px;
`
const StyledStep = styled.h3`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`
const StyledCryptoName = styled.h4`
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 0.4px;
	line-height: 24px;
`
const StyledCryptoAddress = styled.p`
	font-size: 16px;
	line-height: 24px;
`

class DonateCryptoFormComponent extends React.Component {
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

  }

  render = () => {
    const addressObjects = [
      {
        name: 'Bitcoin',
        address: '0x334hfkjs983tbg93thns929tnsk2048fnsa',
      },
      {
        name: 'Ethereum',
        address: '0x334hfkjs983tbg93thns929tnsk2048fnsa',
      },
      {
        name: 'Monero',
        address: '0x334hfkjs983tbg93thns929tnsk2048fnsa',
      },
      {
        name: 'Dash',
        address: '0x334hfkjs983tbg93thns929tnsk2048fnsa',
      },
      {
        name: 'Zcash',
        address: '0x334hfkjs983tbg93thns929tnsk2048fnsa',
      }
    ]

    const onAddressCopy = (name) => {
      const newCopiedState = {};
      addressObjects.forEach(add => { // Rest copied to false for each state
        newCopiedState[`${add.name}IsCopied`] = false;
      })
      this.setState(newCopiedState);

      this.setState({ [`${name}IsCopied`]: true });
    }

    const CryptoAddress = ({ name, address }) => {
      return (
        <div>
          <StyledCryptoName>{name}</StyledCryptoName>
          <Flex>
            <StyledCryptoAddress>{address}</StyledCryptoAddress>
            <CopyToClipboard text={address} onCopy={() => onAddressCopy(name)}>
              <button>Copy</button>
            </CopyToClipboard>
            {this.state[`${name}IsCopied`] ? <span>Copied!</span> : null}
          </Flex>
        </div>
      )
    }

    return (
      <div>
        <StyledLegalText>
          <MarkdownContent content={this.props.cryptoDonation.legalText} />
        </StyledLegalText>
        <Flex>
          <StyledStepNumber>1</StyledStepNumber>
          <StyledStep>{this.props.cryptoDonation.step1.label}</StyledStep>
        </Flex>
        {this.props.cryptoDonation.step1.cryptos.map((crypto, index) => {
          return <CryptoAddress name={crypto.name} address={crypto.address} key={index} />
        })}
        <Flex>
          <StyledStepNumber>2</StyledStepNumber>
          <StyledStep>
            <MarkdownContent content={this.props.cryptoDonation.step2.label} />
          </StyledStep>
        </Flex>
        <Flex>
          <StyledStepNumber>3</StyledStepNumber>
          <StyledStep>{this.props.cryptoDonation.step3.label}</StyledStep>
        </Flex>
      </div>
    )
  }
}

DonateCryptoFormComponent.propTypes = {
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateCryptoFormComponent;
