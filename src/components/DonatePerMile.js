import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'

const StyledToggle = styled.button`
  padding: 10px 30px;
  height: 40px;

  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;

  /* Adapt the colors based on primary prop */
  background: ${props => props.active ? props.theme.tertiary : props.theme.primary};
  color: ${props => props.active ? props.theme.white : props.theme.white};
  box-sizing: border-box;
  border: 1px solid white;
  &:focus {
    outline: none;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 33.333333%;
  }
`;

const OptionRow = styled(Flex)`
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 100%;
  }
`

const DonatePerMileOption = ({ donationObject, onClick, index }) => {
  if (donationObject.selected === true) {
    return (
      <StyledToggle active onClick={(e) => onClick(e, donationObject, index)} >${donationObject.amount}</StyledToggle>
    )
  } else {
    return (
      <StyledToggle onClick={(e) => onClick(e, donationObject, index)} >${donationObject.amount}</StyledToggle>
    )
  }
}

// Takes donation options and maps them to clickable options
const DonatePerMile = ({ donationAmountOptions, onClick }) => {
  // To allow mobile to split the grouping into 3 in each row 
  const firstThreeOptions = donationAmountOptions.slice(0, 3);
  const secondThreeOptions = donationAmountOptions.slice(3);
  return (
    <Flex flexWrap='wrap' mx={[-2, -2, 0]}>
      {/* Lump first three together in row */}
      <OptionRow>
        {firstThreeOptions.map((donationObject, index) => {
          return <DonatePerMileOption donationObject={donationObject} onClick={onClick} index={index} key={index} />
        })}
      </OptionRow>
      {/* Lump second three together in row */}
      <OptionRow>
        {secondThreeOptions.map((donationObject, index) => {
          return <DonatePerMileOption donationObject={donationObject} onClick={onClick} index={index + 3} key={index} />
        })}
      </OptionRow>
    </Flex>
  )
}

DonatePerMile.propTypes = {
  // donationAmountOptions: PropTypes.string.isRequired,
  // onClick: PropTypes.bool.isRequired,
}

export default DonatePerMile 
