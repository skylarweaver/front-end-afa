import React from 'react'
import styled from 'styled-components'
import axios from 'axios';
import PropTypes from 'prop-types'
import moment from 'moment';
import { Flex, Box } from '@rebass/grid'

const DonationTitle = styled.h2`
`

const RecentDonationTitle = styled.h3`
  text-align: center;
`

const DonorName = styled.h4`
  padding-right: 5px;
  margin: 0px;
`

const DonorAmount = styled.p`
  margin: 0px;
  font-family: 'Vidaloka', serif;
  font-size: 26px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${props => props.theme.primary};
`

const DonorNotes = styled.p`
  margin: 10px 0 0 0;
`

const DonorDate = styled.p`
  text-align: right;
  font-size: 14px;
  font-style: italic;
  color: ${props => props.theme.greyNeutral}
`

const MoreDonorsText = styled.p`
  margin-top: 30px;
  margin-bottom: 0;
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.tertiary};
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
    donationData.forEach(donationArr => {
      const intDollarAmount = parseInt(donationArr[process.env.AMOUNT_INDEX].slice(1).replace(',', ''));
      if (intDollarAmount >= 500) { // Large donation
        this.setState({
          largeDonations: [donationArr, ...this.state.largeDonations]
        });
      } else if (intDollarAmount >= 100) { // Medium donation
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
        <Box mb={[0, 0, 4]}>
          <Flex justifyContent='space-between' alignItems='baseline'>
            <DonorName>
              {name}
            </DonorName>
            <DonorAmount>
              {amount}
            </DonorAmount>
          </Flex>
          {notes.length > 0 &&
            <DonorNotes>
              {notes}
            </DonorNotes>
          }
          <DonorDate>
            {/* import Date (in EST which is UTC-4) and specify imported format */}
            {moment(`${date}-4:00`, 'MM/DD/YYYY, h:mm:ss A').fromNow()}
          </DonorDate>
        </Box>
      )
    }

    const LargeDonationsComponent = () => (
      <div>
        {this.state.largeDonations.slice(0, 5).map((largeDonation, index) => (
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
        {this.state.mediumDonations.slice(0, 5).map((mediumDonation, index) => (
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
        {this.state.smallDonations.slice(0, 5).map((smallDonation, index) => (
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
      <Box className={this.props.className} mt={4}>
        <Box>
          <DonationTitle>
            Thank you to our Recent Donors
        </DonationTitle>
          <Flex flexWrap={['wrap', 'wrap', 'wrap', 'initial']} justifyContent='space-evenly'>
            <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 2, 4]}>
              <RecentDonationTitle>
                $500 & Over
            </RecentDonationTitle>
              <LargeDonationsComponent />

            </Box>
            <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 5]}>
              <RecentDonationTitle>
                $100 & Over
            </RecentDonationTitle>
              <MediumDonationsComponent />
            </Box>
            <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 5]}>
              <RecentDonationTitle>
                Under $100
            </RecentDonationTitle>
              <SmallDonationsComponent />
            </Box>
          </Flex>
        </Box>
        <Box>
          <MoreDonorsText>
            And to all past donors, THANK YOU as well!
          </MoreDonorsText>
        </Box>
      </Box>
    )
  }
}

RecentDonorsComponent.propTypes = {
  heading: PropTypes.string,
}

export default RecentDonorsComponent;
