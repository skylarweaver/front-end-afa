import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  padding-left: 60px;
  padding-right: 60px;
  // margin: 16px;
  min-width: 175px;
  height: 50px;

  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.white};

  /* Adapt the colors based on primary prop */
  background: ${props =>
    !props.solid ? props.theme.white
      : (props.primary ? props.theme.primary
        : props.theme.tertiaryLight)
  };
  color: ${props =>
    props.solid ? props.theme.white
      : (props.primary ? props.theme.primary
        : props.theme.tertiaryLight)
  };
  border: solid 2px ${props => props.primary ? props.theme.primary : props.theme.tertiaryLight};
  box-sizing: border-box;
`;

const CtaButton = ({ className, text, to, type, fill }) => {
  if (type === 'primary' && fill === 'solid') {
    return (
      <Link to={to} className={className}>
        <StyledButton primary solid>{text}</StyledButton>
      </Link>
    )
  } else if (type === 'primary' && fill !== 'solid') {
    return (
      <Link to={to} className={className}>
        <StyledButton primary>{text}></StyledButton>
      </Link>
    )
  } else if (type == 'secondary' && fill === 'solid') {
    return (
      <Link to={to} className={className}>
        <StyledButton secondary solid>{text}</StyledButton>
      </Link>
    )
  } else if (type === 'secondary' && fill !== 'solid') {
    return (
      <Link to={to} className={className}>
        <StyledButton secondary>{text}</StyledButton>
      </Link>
    )
  } 
}

CtaButton.propTypes = {
  type: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

CtaButton.defaultProps = {
  type: 'primary',
  fill: 'solid',
  text: '',
  to: ''
}

export default CtaButton 
