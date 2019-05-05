import { createGlobalStyle } from 'styled-components'

// AFA global theme is defined here
export const AfaGlobalStyle = createGlobalStyle`
  html {
    font-family: 'Dosis', sans-serif;
  }
  body {
    // color: ${props => (props.whiteColor ? 'white' : 'black')};
    height: 100%;
    width: 100%;
    margin: 0;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 60px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.93;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: 53px;
    }
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.tertiary};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: 34px;
    }
  }

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.97;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: 28px;
    }
  }

  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: 24px;
    }
  }

  .numbers {
    font-family: 'Vidaloka', serif;
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      font-size: 24px;
    }
  }

  p {
    font-family: 'Dosis', sans-serif;;
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${props => props.theme.blackNeutral};
    @media (max-width: ${props => props.theme.breakpoints[1]}) {
      // font-size: 16px;
    }
  }

  a {
    font-family: Dosis;
    text-decoration: none;
    color: ${props => props.theme.primary};
    &:hover {
      color: ${props => props.theme.tertiary};
      text-decoration: underline ${props => props.theme.tertiary};
    }
    &:focus {
      outline-color: ${props => props.theme.tertiary};
    }
  }

  hr {
    width: 100%;
    border: none;
    border-bottom: solid 2px ${props => props.theme.primary};
  }

  nav {
    font-family: 'Dosis', sans-serif;;
  }

  input {
    height: 50px;
    border: solid 1px #cfcfcf;
    background-color: #ffffff;
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color:  ${props => props.theme.tertiary};
    &::placeholder {
      color:  ${props => props.theme.greyNeutral};
    }
    &:focus {
      outline-color: ${props => props.theme.tertiary};
    }
  }

  input[type=checkbox] {
    height: initial;
    margin-bottom: 0px;
    transform: scale(1.5);
    margin-left: 10px;
  }

  textarea {
    height: 100px;
    border: solid 1px #cfcfcf;
    background-color: #ffffff;
    padding-top: 10px;
    padding-left: 20px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: ${props => props.theme.tertiary};
    &::placeholder {
      font-family: Roboto;
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;
      color: ${props => props.theme.greyNeutral};
    }
    &:focus {
      outline-color: ${props => props.theme.tertiary};
    }
  }

`