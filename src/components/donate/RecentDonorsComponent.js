import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Flex, Box } from '@rebass/grid'
import publicDonations from '../../data/publicDonations.json'
import { FINAL_DONATION_COUNT } from '../../data/donationSummary'

// Column positions in the donation snapshot (see src/data/publicDonations.json)
const DATE_INDEX = 0
const NAME_INDEX = 1
const AMOUNT_INDEX = 2
const NOTES_INDEX = 3
const HIDE_NAME_INDEX = 4
const HIDE_NOTES_INDEX = 5

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

const parseDollars = amount => parseInt(String(amount).replace(/[$,]/g, ''), 10) || 0

// Most recent donations first, honoring each donor's privacy choices
const donations = [...publicDonations.values].reverse().map(row => ({
  date: row[DATE_INDEX],
  name: row[HIDE_NAME_INDEX] === 'TRUE' ? 'Anonymous' : row[NAME_INDEX],
  amount: row[AMOUNT_INDEX],
  notes: row[HIDE_NOTES_INDEX] === 'TRUE' ? '' : (row[NOTES_INDEX] || ''),
  dollars: parseDollars(row[AMOUNT_INDEX]),
}))

const largeDonations = donations.filter(d => d.dollars >= 500).slice(0, 5)
const mediumDonations = donations.filter(d => d.dollars >= 100 && d.dollars < 500).slice(0, 5)
const smallDonations = donations.filter(d => d.dollars < 100).slice(0, 5)

const formatDate = date => {
  const parsed = moment(date, 'M/D/YYYY, h:mm:ss A')
  return parsed.isValid() ? parsed.format('MMMM D, YYYY') : ''
}

const DonationComponent = ({ name, amount, notes, date }) => (
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
      {formatDate(date)}
    </DonorDate>
  </Box>
)

const DonationList = ({ items }) => (
  <div>
    {items.map((donation, index) => (
      <DonationComponent
        name={donation.name}
        amount={donation.amount}
        notes={donation.notes}
        date={donation.date}
        key={index}
      />
    ))}
  </div>
)

const RecentDonorsComponent = ({ className }) => (
  <Box className={className} mt={4}>
    <Box>
      <DonationTitle>
        Thank you to our Donors
      </DonationTitle>
      <Flex flexWrap={['wrap', 'wrap', 'wrap', 'initial']} justifyContent='space-evenly'>
        <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 2, 4]}>
          <RecentDonationTitle>
            $500 & Over
          </RecentDonationTitle>
          <DonationList items={largeDonations} />
        </Box>
        <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 5]}>
          <RecentDonationTitle>
            $100 & Over
          </RecentDonationTitle>
          <DonationList items={mediumDonations} />
        </Box>
        <Box width={[1, 3 / 4, 3 / 4, 1 / 3]} mx={[3, 3, 5]}>
          <RecentDonationTitle>
            Under $100
          </RecentDonationTitle>
          <DonationList items={smallDonations} />
        </Box>
      </Flex>
    </Box>
    <Box>
      <MoreDonorsText>
        And to all {FINAL_DONATION_COUNT} donors over the years, THANK YOU!
      </MoreDonorsText>
    </Box>
  </Box>
)

RecentDonorsComponent.propTypes = {
  className: PropTypes.string,
}

export default RecentDonorsComponent;
