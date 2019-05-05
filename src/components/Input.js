import React from 'react'
import styled from 'styled-components'
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

const DonationAmountInput = styled.input`
  font-size: 18px;
`

  // format number 1000000 to 1,234,567
function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// appends $ to value, validates decimal side and puts cursor back in right position.
function formatCurrency(inputRef, blur) {
  // get input value
  var input_val = inputRef.value;
  // don't validate empty input
  if (input_val === "") { return; }
  // original length
  var original_len = input_val.length;
  // initial caret position 
  var caret_pos = inputRef.selectionStart;
  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");
    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);
    // add commas to left side of number
    left_side = formatNumber(left_side);
    // validate right side
    right_side = formatNumber(right_side);
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);
    // join number by .
    input_val = "$" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  // send updated string to input
  inputRef.value = (input_val);
  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  inputRef.setSelectionRange(caret_pos, caret_pos);
}

const Input = ({ label, name, type, placeholder, value, required, onChange, inputType }) => {
  const inputRef = React.createRef();
  if (name === 'donationAmount') {
    return (
      <React.Fragment>
      {/* <StyledLabel showLabel={value.length > 0}>
        {label}
      </StyledLabel> */}
      <DonationAmountInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        onKeyUp={() => formatCurrency(inputRef.current)}
        onBlur={() => formatCurrency(inputRef.current, 'blur')}
        ref={inputRef}
      />
      </React.Fragment>
    )
  } else if (inputType === 'input') {
    return (
      <React.Fragment>
        <StyledLabel showLabel={value.length > 0}>
          {label}
        </StyledLabel>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
          />

      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <StyledLabel showLabel={value.length > 0}>
          {label}
        </StyledLabel>
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
      </React.Fragment>
    )
  }
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
