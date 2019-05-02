import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'

const StyledLabel = styled.label`
  position: relative;
  margin-bottom: -10px;
  left: 10px;
  background: white;
  width: fit-content;
  padding: 0px 8px 0 5px;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.85;
  letter-spacing: normal;
  color: ${props => props.theme.greyNeutral};
  display: ${props => props.showLabel ? 'initial' : 'none'}
`

const Input = ({ className, label, name, type, placeholder, value, required, onChange, inputType, ref }) => {

  return (
    <React.Fragment>
      <StyledLabel showLabel={value.length > 0}>
        {label}
      </StyledLabel>
      {inputType === 'input' ?
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
        />
        :
        <textarea
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          rows="10"
          cols="30"
        />
      }

    </React.Fragment>
  )
}


Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  inputType: PropTypes.string,
}

Input.defaultProps = {
  required: false,
  inputType: 'input',
}


export default Input;
