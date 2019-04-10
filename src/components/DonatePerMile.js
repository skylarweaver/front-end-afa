import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'

const StyledToggle = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.active ? "palevioletred" : "white"};
  color: ${props => props.active ? "white" : "palevioletred"};

  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  box-sizing: border-box;
`;

const DonatePerMileOption = ({ donationObject, onClick, index }) => {
  if (donationObject.selected === true) {
    return (
      <StyledToggle active onClick={(e) => onClick(e, donationObject, index)}>${donationObject.amount}</StyledToggle>
    )
  } else {
    return (
      <StyledToggle onClick={(e) => onClick(e, donationObject, index)}>${donationObject.amount}</StyledToggle>
    )
  }
}

const DonatePerMile = ({ donationAmountOptions, onClick }) => {
  return (
    <Flex>
      {donationAmountOptions.map((donationObject, index) => {
        return <DonatePerMileOption donationObject={donationObject} onClick={onClick} index={index} key={index} />
      })}
    </Flex>
  )
}

DonatePerMile.propTypes = {
  // donationAmountOptions: PropTypes.string.isRequired,
  // onClick: PropTypes.bool.isRequired,
}

export default DonatePerMile 
