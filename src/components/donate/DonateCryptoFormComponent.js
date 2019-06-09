import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components'
import { cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import { Flex } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'

const StyledLegalText = styled.p`
	font-size: 10px;
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
        address: '1JC59jqXCwEjBQiQoEmQTqc9zk22SDFFEk',
      },
      {
        name: 'Ethereum',
        address: '0xB47517B501B043E3c5ea4f8fDDf3462d38e8ea36',
      },
      {
        name: 'Litecoin',
        address: 'LbrzgB4e5uQsDvUtydXw21Zm9MPP5hXGqi',
      },
      {
        name: 'Dash',
        address: 'Xsp3GQbczfCjKfpfJ9rN4ULWrvJZG5fYH2',
      },
      {
        name: 'Dogecoin',
        address: 'DR4rQnMXSX9BV4nFa6CJRopJQGa95UfmiV',
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
