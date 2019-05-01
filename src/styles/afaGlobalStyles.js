import { createGlobalStyle } from 'styled-components'

// AFA global theme is defined here
export const AfaGlobalStyle = createGlobalStyle`
  body {
    // color: ${props => (props.whiteColor ? 'white' : 'black')};
    height: 100%;
    width: 100%;
    margin: 0;
  }

  h1 {
    font-family: PlayfairDisplay;
    font-size: 60px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.93;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
  }

  h2 {
    font-family: PlayfairDisplay;
    font-size: 48px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.tertiary};
  }

  h3 {
    font-family: PlayfairDisplay;
    font-size: 36px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.97;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
  }

  h4 {
    font-family: PlayfairDisplay;
    font-size: 26px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
  }

  .numbers {
    font-family: Vidaloka;
    font-size: 26px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: ${props => props.theme.secondary};
  }

  p {
    font-family: Roboto;
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: ${props => props.theme.blackNeutral};
  }

  button {
    padding: 16px 60px;
    margin: 16px
    min-width: 175px;
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
  }

  nav {
    font-family: Roboto;
  }
`