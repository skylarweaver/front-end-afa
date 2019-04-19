import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import { StripeProvider, Elements, injectStripe, CardElement, PaymentRequestButtonElement } from 'react-stripe-elements';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

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
    addressObjects.forEach( add => { // Rest copied to false for each state
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
            <CopyToClipboard text={address} onCopy={() => onAddressCopy(name) }>
             <button>Copy</button>
            </CopyToClipboard>
            { this.state[`${name}IsCopied`] ? <span>Copied!</span> : null }
          </Flex>
        </div>
      )
    }

    return (
      <div>
        <StyledLegalText>All donations are tax-deductible.</StyledLegalText>
        <StyledLegalText>Adventures for Alopecia is a registered 501(c)(3) nonprofit organization.</StyledLegalText>
        <Flex>
          <StyledStepNumber>1</StyledStepNumber>
          <StyledStep>Send your  donation to an address below:</StyledStep>
        </Flex>
        { addressObjects.map( (add, index) => {
          return <CryptoAddress name={add.name} address={add.address} key={index}/>
        })}
        <Flex>
          <StyledStepNumber>2</StyledStepNumber>
          <StyledStep>To receive a proof of donation, send us an email with the transactions details within 24 hours, and we will confirm your donation.</StyledStep>
        </Flex>
        <Flex>
          <StyledStepNumber>3</StyledStepNumber>
          <StyledStep>Be happy for supporting people with Alopecia!</StyledStep>
        </Flex>
      </div>
    )
  }
}

DonateCryptoFormComponent.propTypes = {
  // heading1: PropTypes.string.isRequired,
}

export default DonateCryptoFormComponent;
