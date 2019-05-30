import React from 'react'
import { Link } from 'gatsby'
// import logo from '../img/logo-white@3x.png'
import styled from "styled-components"
// import CtaButton from './CtaButton'
import { Flex, Box } from '@rebass/grid'
import AfaLogo from './AfaLogo';
// import axios from 'axios';

const StyledNavbar = styled.nav`
  width: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0); 
`
const LogoContainer = styled(Box)`
  width: 291px;
`
const NavbarAfaLogo = styled(AfaLogo)`
  margin: 0;
`
const NavbarLink = styled(Link)`
  font-size: 20px;
  text-align: center;
  padding: 14px;
  margin: 5px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => (props.active ?
    (props.dark ? 
      props.theme.secondary
      : 
      props.theme.primary) 
    : (props.dark ? 
      props.theme.primary
      : 
      props.theme.white))};
  &:hover {
    color: ${props => (props.active ?
      (props.dark ? 
        props.theme.secondaryHover
        : 
        props.theme.primaryHover) 
      : (props.dark ? 
        props.theme.primaryHover
        : 
        props.theme.white))};
    text-decoration: none;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 16px
    padding: 0 4px;
    margin: 0 1px;
    display: ${props => props.donate ? 'none' : 'initial'}
  }
`

const Navbar = class extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDonationAmount: '...........',
    };
  }

  componentDidMount() {
    this.setupHamburgerFunctionality();
  }

  setupHamburgerFunctionality() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  };

  render() {
    return (

      <StyledNavbar className={this.props.className} role="navigation" aria-label="main-navigation">
        {/* <Logo src={logo} alt="Adventures for Alopecia logo" style={{ width: '88px' }} /> */}
        <Flex alignItems='center'>
          <LogoContainer>
            {this.props.dark ? <NavbarAfaLogo link dark /> : <NavbarAfaLogo link />}
          </LogoContainer>
          <div data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Box id="navMenu" ml={[2,2,3]}>
              <NavbarLink dark={`${this.props.dark}` } active={this.props.about ? 1 : 0} to="/about-afa">
                About
              </NavbarLink>
              <NavbarLink dark={`${this.props.dark}` } active={this.props.map ? 1 : 0} to="/map">
                Map
              </NavbarLink>
              <NavbarLink donate='true' dark={`${this.props.dark}` } active={this.props.donate ? 1 : 0} to="/donate">
                Donate
              </NavbarLink>
            {/* <DonateSection>
              <DonateTextSection>
                <DonationAmount>${this.state.totalDonationAmount}</DonationAmount>
                <br></br>
                <DonationText>Raised for Alopecia</DonationText>
              </DonateTextSection>
                <CtaButton text={'Donate'} to={'/donate'} type={'primary'} />
            </DonateSection> */}
          </Box>
        </Flex>
      </StyledNavbar>
    )
  }
}

export default Navbar
