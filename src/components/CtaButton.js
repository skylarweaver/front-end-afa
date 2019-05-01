import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props =>
    !props.solid ? props.theme.white
      : (props.primary ? props.theme.primary
        : props.theme.secondary)
  };
  color: ${props =>
    props.solid ? props.theme.white
      : (props.primary ? props.theme.primary
        : props.theme.secondary)
  };
  border: solid 2px ${props => props.primary ? props.theme.primary : props.theme.secondary};
  box-sizing: border-box;
`;

const CtaButton = ({ text, to, type, fill }) => {
  if (type === 'primary' && fill === 'solid') {
    return (
      <Link to={to}>
        <StyledButton primary solid>{text}</StyledButton>
      </Link>
    )
  } else if (type === 'primary' && fill !== 'solid') {
    return (
      <Link to={to}>
        <StyledButton primary>{text}></StyledButton>
      </Link>
    )
  } else if (type == 'secondary' && fill === 'solid') {
    return (
      <Link to={to}>
        <StyledButton secondary solid>{text}></StyledButton>
      </Link>
    )
  } else if (type === 'secondary' && fill !== 'solid') {
    return (
      <Link to={to}>
        <StyledButton secondary>{text}></StyledButton>
      </Link>
    )
  } 
}

CtaButton.propTypes = {
  type: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default CtaButton 
