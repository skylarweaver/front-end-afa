import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components'
import { cryptoDonationPropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import { graphql, StaticQuery } from 'gatsby'
import Link from '../GatsbyLink'
import Image from 'gatsby-image/withIEPolyfill'
import BitcoinQR from '../../img/qrCodes/bitcoin.png'
import EthereumQR from '../../img/qrCodes/ethereum.png'
import LitecoinQR from '../../img/qrCodes/litecoin.png'
import DashQR from '../../img/qrCodes/dash.png'
import DogecoinQR from '../../img/qrCodes/dogecoin.png'

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
white-space: nowrap;
&:focus {
  outline: none;
}
&:hover {
  cursor: pointer;
  background: ${props => props.active ? props.theme.tertiary : props.theme.tertiaryLight};
};
`

const QrButton = styled.button`
font-family: Roboto;
/* Adapt the colors based on primary prop */
background: ${props => props.active ? props.theme.tertiary : props.theme.primary};
color: ${props => props.active ? props.theme.white : props.theme.white};
white-space: nowrap;
margin-left: 5px;
&:focus {
  outline: none;
}
&:hover {
  cursor: pointer;
  background: ${props => props.active ? props.theme.tertiary : props.theme.tertiaryLight};
}
`

const PartnersSection = styled.div`
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
`

const PartnerDescription = styled.p`
	font-size: 18px;
	letter-spacing: 0.4px;
  line-height: 24px;
`

const PartnersHeading = styled.h4`
  margin-bottom: 20px;
`

const PartnerImage = styled(Image)`
  max-width: 100%;
  max-height: 150px;
`

const QrCode = styled.img`
  max-height: 300px;
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
      newCopiedState: {},
      newShowQrState: {},
    };
  }

  render = () => {
    const addressObjects = [
      {
        name: 'Ethereum',
        address: '0xB47517B501B043E3c5ea4f8fDDf3462d38e8ea36',
        qrCode: EthereumQR
      },
      {
        name: 'Bitcoin',
        address: '1JC59jqXCwEjBQiQoEmQTqc9zk22SDFFEk',
        qrCode: BitcoinQR
      },
      // {
      //   name: 'Litecoin',
      //   address: 'LbrzgB4e5uQsDvUtydXw21Zm9MPP5hXGqi',
      //   qrCode: LitecoinQR
      // },
      // {
      //   name: 'Dash',
      //   address: 'Xsp3GQbczfCjKfpfJ9rN4ULWrvJZG5fYH2',
      //   qrCode: DashQR
      // },
      {
        name: 'Dogecoin',
        address: 'DR4rQnMXSX9BV4nFa6CJRopJQGa95UfmiV',
        qrCode: DogecoinQR,
      }
    ]

    const onAddressCopy = (name) => {
      const newCopiedState = {};
      const newShowQRState = {};
      addressObjects.forEach(addr => { // Reset copied to false for each state
        if (addr.name === name) {
          newCopiedState[`${addr.name}IsCopied`] = true;
        } else {
          newCopiedState[`${addr.name}IsCopied`] = false;
          newShowQRState[`${addr.name}ShowQr`] = false;
        }
      })
      this.setState({
        ...newCopiedState,
        ...newShowQRState,
      })
    }
    const onShowQr = (name) => {
      const newCopiedState = {};
      const newShowQRState = {};
      addressObjects.forEach(addr => { // Reset copied to false for each state
        if (addr.name === name) {
          newShowQRState[`${addr.name}ShowQr`] = true;
        } else {
          newShowQRState[`${addr.name}ShowQr`] = false;
        }
        newCopiedState[`${addr.name}IsCopied`] = false;
      })
      this.setState({
        ...newCopiedState,
        ...newShowQRState,
      });
    }

    const CryptoAddress = ({ name, address, qrCode }) => {
      return (
        <div>
          <StyledCryptoName>{name}</StyledCryptoName>
          <Flex>
            <StyledCryptoAddress>{address}</StyledCryptoAddress>
            <CopyToClipboard text={address} onCopy={() => onAddressCopy(name)}>
              <CopyButton active={this.state[`${name}IsCopied`]}> {this.state[`${name}IsCopied`] ? 'Copied!' : 'Copy'} </CopyButton>
            </CopyToClipboard>
            <CopyToClipboard text="Please double check you copied the correct address." onCopy={() => onShowQr(name)}>
              <QrButton active={this.state[`${name}ShowQr`]}> {this.state[`${name}ShowQr`] ? 'Show QR' : 'Show QR'} </QrButton>
            </CopyToClipboard>
          </Flex>
          {this.state[`${name}ShowQr`] ? <QrCode src={qrCode} /> : ''}
        </div>
      )
    }

    return (
      <StaticQuery query={graphql`
          query {
            tgb: file(relativePath: { eq: "logos/tgb.png" }) {
              childImageSharp {
                fluid(quality: 100, maxHeight: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        `}
        render={data => (
          <div className={this.props.className}>
            <Flex my={[3, 3, 3]} alignItems='baseline'>
              <StyledStepNumber>1.</StyledStepNumber>
              <StyledStep>{this.props.cryptoDonation.step1.label}</StyledStep>
            </Flex>
            <Box ml={[1, 4, 4]}>
              {addressObjects.map((crypto, index) => {
                return <CryptoAddress name={crypto.name} address={crypto.address} qrCode={crypto.qrCode} key={index} />
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
            <PartnersSection>
              <PartnersHeading>
                Our Crypto Advisor
          </PartnersHeading>
              <PartnerDescription>
                And a huge thanks to our crypto nonprofit advising partner:
          </PartnerDescription>
              <Flex alignItems='center' justifyContent='left'>
                <Box width={[8 / 12]} mr={[4, 4, 4]}>
                  <Link to="https://www.thegivingblock.com">
                    <PartnerImage alt="The Giving Block" fluid={data.tgb.childImageSharp.fluid} objectFit="contain" />
                  </Link>
                </Box>
              </Flex>
            </PartnersSection>
          </div>
        )} />
    )
  }
}

DonateCryptoFormComponent.propTypes = {
  cryptoDonation: cryptoDonationPropTypes,
}

export default DonateCryptoFormComponent;
