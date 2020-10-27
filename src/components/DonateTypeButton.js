import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledToggle = styled.button`
  padding: 10px 15px;
  height: 48px;
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  cursor: pointer;

  /* Adapt the colors based on primary prop */
  background: ${props => props.active ? props.theme.tertiary : props.theme.primary};
  color: ${props => props.active ? props.theme.white : props.theme.white};
  box-sizing: border-box;
  border: 1px solid white;
  width: 50%;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background: ${props => props.active ? props.theme.tertiaryHover : props.theme.primaryHover};
  };
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
