import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  box-sizing: border-box;
`;

const CtaButton = ({ text, to, type }) => {
  console.log('type: ', type);
  if (type === 'primary') {
    return (
      <Link to={to}>
        <StyledButton primary>{text}</StyledButton>
      </Link>
    )
  } else {
    return (
      <Link to={to}>
        <StyledButton>{text}></StyledButton>
      </Link>
    )
  }
}

CtaButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default CtaButton 
