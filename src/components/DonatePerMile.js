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
  // border-radius: 3px;
  box-sizing: border-box;


  padding: 10px 30px;
  margin: 16px
  height: 50px;

  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.theme.white};

  /* Adapt the colors based on primary prop */
  background: ${props => props.active ? props.theme.primary : props.theme.white};
  color: ${props => props.active ? props.theme.white : props.theme.primary};
  border: solid 2px ${props => props.theme.primary};
  border-right: ${props => props.lastItem ? `solid 2px ${props.theme.primary}` : `none`};
  box-sizing: border-box;
`;

const DonatePerMileOption = ({ donationObject, onClick, index, lastItem }) => {
  if (donationObject.selected === true) {
    return (
      <StyledToggle active onClick={(e) => onClick(e, donationObject, index)} lastItem={lastItem}>${donationObject.amount}</StyledToggle>
    )
  } else {
    return (
      <StyledToggle onClick={(e) => onClick(e, donationObject, index)} lastItem={lastItem}>${donationObject.amount}</StyledToggle>
    )
  }
}

const DonatePerMile = ({ donationAmountOptions, onClick }) => {
  return (
    <Flex>
      {donationAmountOptions.map((donationObject, index) => {
        return <DonatePerMileOption donationObject={donationObject} onClick={onClick} index={index} lastItem={donationAmountOptions.length-1 === index} key={index} />
      })}
    </Flex>
  )
}

DonatePerMile.propTypes = {
  // donationAmountOptions: PropTypes.string.isRequired,
  // onClick: PropTypes.bool.isRequired,
}

export default DonatePerMile 
