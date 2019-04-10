import React from 'react'
import styled from 'styled-components'
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

const DonateTypeButton = ({ text, active, onClick}) => {
  if (active === true) {
    return (
        <StyledToggle active onClick={onClick}>{text}</StyledToggle>
    )
  } else {
    return (
        <StyledToggle onClick={onClick}>{text}</StyledToggle>
    )
  }
}

DonateTypeButton.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

export default DonateTypeButton 
