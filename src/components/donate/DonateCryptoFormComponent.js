import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components'
import { cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import { Flex } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'

const StyledStepNumber = styled.h3`
  font-family: Vidaloka;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color:  ${props => props.theme.tertiary};
  margin: 0 10px 0 0;
`
const StyledStep = styled.h4`
  color:  ${props => props.theme.tertiary};
  margin-top: 30px;
  margin-bottom: 8px;
  margin: 0;
  &:first-of-type {
    margin-top: 0px;
  }
`
const StyledStepDetails = styled.p`
  margin: 0;
`
const StyledCryptoName = styled.h3`
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 0.4px;
  line-height: 24px;
  margin-bottom: 0;
`
const StyledCryptoAddress = styled.p`
	font-size: 16px;
  line-height: 24px;
  margin: 0 10px 0 0;
`

const CopyButton = styled.button`
font-family: Roboto;
/* Adapt the colors based on primary prop */
background: ${props => props.active ? props.theme.tertiary : props.theme.primary};
color: ${props => props.active ? props.theme.white : props.theme.white};
border: 1px solid white;
&:focus {
  outline: none;
}
&:hover {
  cursor: pointer;
  background: ${props => props.active ? props.theme.tertiary : props.theme.tertiaryLight};
  border: none;
};
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
        if (add.name === name) {
          newCopiedState[`${add.name}IsCopied`] = true;
        } else {
          newCopiedState[`${add.name}IsCopied`] = false;
        }
      })
      this.setState(newCopiedState);
    }

    const CryptoAddress = ({ name, address }) => {
      return (
        <div>
          <StyledCryptoName>{name}</StyledCryptoName>
          <Flex>
            <StyledCryptoAddress>{address}</StyledCryptoAddress>
            <CopyToClipboard text={address} onCopy={() => onAddressCopy(name)}>
              <CopyButton active={this.state[`${name}IsCopied`]}>{this.state[`${name}IsCopied`] ? 'Copied!' : 'Copy'}</CopyButton>
            </CopyToClipboard>
          </Flex>
        </div>
      )
    }

    return (
      <div className={this.props.className}>
        <Flex my={[3, 3, 3]} alignItems='baseline'>
          <StyledStepNumber>1.</StyledStepNumber>
          <StyledStep>{this.props.cryptoDonation.step1.label}</StyledStep>
        </Flex>
        <Box ml={[1, 4, 4]}>
          {this.props.cryptoDonation.step1.cryptos.map((crypto, index) => {
            return <CryptoAddress name={crypto.name} address={crypto.address} key={index} />
          })}
        </Box>
        <Flex my={[3, 3, 4]} alignItems='baseline'>
          <StyledStepNumber>2.</StyledStepNumber>
          <Box>
          <StyledStep>
            {/* {this.props.cryptoDonation.step2.label} */}
            Send us an email...
          </StyledStep>
          <StyledStepDetails>with the transactions details, and we'll send you confirmation of your tax-deductible donation.</StyledStepDetails>
          </Box>
        </Flex>
        <Flex my={[3, 3, 4]} alignItems='baseline'>
          <StyledStepNumber>3.</StyledStepNumber>
          <Box>
          <StyledStep>
            {/* {this.props.cryptoDonation.step3.label} */}
            Feel good...
          </StyledStep>
          <StyledStepDetails>about supporting people with Alopecia!</StyledStepDetails>
          </Box>
        </Flex>
      </div>
    )
  }
}

DonateCryptoFormComponent.propTypes = {
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateCryptoFormComponent;
