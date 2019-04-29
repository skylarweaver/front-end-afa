import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import axios from 'axios';
import PropTypes from 'prop-types'
import moment from 'moment';
import { donatePropTypes } from '../../proptypes/donate-proptypes'
import { Flex, Box } from '@rebass/grid'
import MarkdownContent from '../MarkdownContent'
import CtaButton from '../CtaButton'

const AboutOrgTitle = styled.h2`
	font-size: 50px;
	font-weight: bold;
	letter-spacing: -1.75px;
	line-height: 66px;
`

const DonationTitle = styled.div`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const RecentDonationTitle = styled.div`
font-size: 28px;
font-weight: bold;
line-height: 24px;
`

const DonorName = styled(Box)`
	font-size: 21px;
	font-weight: bold;
	line-height: 24px;
`

const DonorAmount = styled(Box)`
	font-size: 21px;
	font-weight: bold;
	line-height: 24px;
	text-align: right;
`

const DonorNotes = styled(Box)`
	height: 66px;
	width: 233.77px;
	color: #343D46;
	font-family: Roboto;
	font-size: 14px;
	line-height: 22px;
`

const DonorDate = styled(Box)`
	height: 21.07px;
	width: 91px;
	color: #343D46;
	font-family: Roboto;
	font-size: 14px;
	font-style: italic;
	line-height: 22px;
	text-align: right;
`


class RecentDonorsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      smallDonations: [],
      mediumDonations: [],
      largeDonations: [],
    };
  }

  componentDidMount() {
    this.getCurrentRecentDonations();
  }

  async getCurrentRecentDonations() {
    try {
      const donationDataRes = await axios.get(`${process.env.SERVER_GET_PUBLIC_DONATION_DATA_URL}`)
      this.filterDonationBasedOnAmount(donationDataRes.data.values);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  filterDonationBasedOnAmount(donationData) {
    donationData.map((donationArr) => {
      const intDollarAmount = parseInt(donationArr[process.env.AMOUNT_INDEX].slice(1).replace(',',''));
      if (intDollarAmount >= 500) { // Large donation
        this.setState({
          largeDonations: [donationArr, ...this.state.largeDonations]
        });
      } else if (intDollarAmount >= 100) { // Large donation
        this.setState({
          mediumDonations: [donationArr, ...this.state.mediumDonations]
        });
      } else { // Small donation
        this.setState({
          smallDonations: [donationArr, ...this.state.smallDonations]
        });
      }
    });
  }

  render = () => {

    const RecentDonationComponent = ({ name, amount, notes, date }) => {
      return (
        <div>
          <Flex>
            <DonorName>
              {name}
            </DonorName>
            <DonorAmount>
              {amount}
            </DonorAmount>
          </Flex>
          <DonorNotes>
            {notes}
          </DonorNotes>
          <DonorDate>
            {moment(date).fromNow()}
          </DonorDate>
        </div>
      )
    }

    const LargeDonationsComponent = () => (
      <div>
        {this.state.largeDonations.map((largeDonation, index) => (
          <RecentDonationComponent
            name={largeDonation[process.env.NAME_INDEX]}
            amount={largeDonation[process.env.AMOUNT_INDEX]}
            notes={largeDonation[process.env.NOTES_INDEX]}
            date={largeDonation[process.env.DATE_INDEX]}
            key={index}
          />
        ))}
      </div>
    )

    const MediumDonationsComponent = () => (
      <div>
        {this.state.mediumDonations.map((mediumDonation, index) => (
          <RecentDonationComponent
            name={mediumDonation[process.env.NAME_INDEX]}
            amount={mediumDonation[process.env.AMOUNT_INDEX]}
            notes={mediumDonation[process.env.NOTES_INDEX]}
            date={mediumDonation[process.env.DATE_INDEX]}
            key={index}
          />
        ))}
      </div>
    )

    const SmallDonationsComponent = () => (
      <div>
        {this.state.smallDonations.map((smallDonation, index) => (
          <RecentDonationComponent
            name={smallDonation[process.env.NAME_INDEX]}
            amount={smallDonation[process.env.AMOUNT_INDEX]}
            notes={smallDonation[process.env.NOTES_INDEX]}
            date={smallDonation[process.env.DATE_INDEX]}
            key={index}
          />
        ))}
      </div>
    )

    return (
      <div>
        <DonationTitle>
          Thank you donors!
        </DonationTitle>
        <Flex>
          <Box>
            <RecentDonationTitle>
              $500 & Over
            </RecentDonationTitle>
            <LargeDonationsComponent />
          </Box>
          <Box>
            <RecentDonationTitle>
              $100 & Over
            </RecentDonationTitle>
            <MediumDonationsComponent />
          </Box>
          <Box>
            <RecentDonationTitle>
              Under $100
            </RecentDonationTitle>
            <SmallDonationsComponent />
          </Box>
        </Flex>
      </div>
    )
  }
}

RecentDonorsComponent.propTypes = {
  heading: PropTypes.string,
}

export default RecentDonorsComponent;
