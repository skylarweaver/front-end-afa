import React from 'react'
import { Link } from 'gatsby'
// import logo from '../img/logo-white@3x.png'
import styled from "styled-components"
// import CtaButton from './CtaButton'
import { Flex, Box } from '@rebass/grid'
import AfaLogo from './AfaLogo';
import ArrowDownIcon from '../img/icons/chevron-white.png';
import ContentLayout from './ContentLayout'
import { globalHistory } from '@reach/router';
// import axios from 'axios';

const StyledNavbar = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  background-color: ${props => (props.sticky || props.map) ? props.theme.secondary : 'rgba(0, 0, 0, 0)'}; 
  transition: ${props => (props.sticky || props.map) ? 'background-color 400ms ease' : 'background-color 0ms ease'}; 
  box-shadow: ${props => (props.sticky || props.map) ? '0 3px 3px -2px rgba(0,0,0,.2)' : 'initial'}; 
`
const LogoContainer = styled(Box)`
  width: 291px;
`
const NavbarAfaLogo = styled(AfaLogo)`
  margin: 0;
`
const DesktopNavContainer = styled(Flex)`
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
`
const MobileNavContainer = styled(Flex)`
  width: 291px;
  display: none;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: Flex;
  }
`
const NavbarLink = styled(Link)`
  font-size: 20px;
  text-align: center;
  padding: 14px;
  margin: 5px;
  font-weight: bold;
  color: ${props => (props.active ?
    (props.dark ?
      props.theme.tertiary
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
    padding: 0; // 20px 0 0;
    margin: 0; // 5px 0px 0px;
  }
`

const DownArrow = styled.img`
  display: none;
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    display: initial;
  }
`

const Navbar = class extends React.Component {

  constructor(props) {
    super(props);
    // Determine current page
    let currPage;
    switch (globalHistory.location.pathname) {
      case '/':
        currPage = 'home'
        break;
      case '/about-afa':
        currPage = 'about'
        break;
      case '/map':
        currPage = 'map'
        break;
      case '/donate':
        currPage = 'donate'
        break;
    }
    this.state = {
      sticky: false,
      totalDonationAmount: '...........',
      currPage,
      darkLogos: ['about', 'map', 'donate']
    };
    this.changeStickyHeader = this.changeStickyHeader.bind(this);
  }

  componentDidMount() {
    // this.setupHamburgerFunctionality();
    window.addEventListener('scroll', this.changeStickyHeader, false);
    if (this.state.currPage === 'map' && !this.state.sticky) {
      this.setState({ sticky: true, }); // Set sticky header on map
    };
  }

  componentWillUnmount() {
    // Setup sticky nav on scroll
    window.removeEventListener('scroll', this.changeStickyHeader, false) // Cancel scroll listener
    window.cancelAnimationFrame(this.state.timeout); // Cancel repaint request
  }

  changeStickyHeader() {
    // If there's a timer, cancel it
    if (this.state.timeout) {
      window.cancelAnimationFrame(this.state.timeout);
    }
    // Setup the new requestAnimationFrame()
    const newTimeout = window.requestAnimationFrame(() => {
      // Sticky header (w/ dark background on map page all the time)
      if (this.state.currPage === 'map' && this.state.sticky) return; // Already sticky on map page
      // Not map page, so run determine if nav should be sticky when scrolling
      if (window.pageYOffset > 0) {
        this.setState({ sticky: true, });
      } else {
        this.setState({ sticky: false, });
      }
    });
    this.setState({
      timeout: newTimeout,
    })
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
      <StyledNavbar className={this.props.className} sticky={this.state.sticky} role="navigation" aria-label="main-navigation">
        <ContentLayout top={this.state.sticky ? [2, 2, 2] : [3, 3, 4]} bottom={this.state.sticky ? [2, 2, 2] : [3, 3, 3]}>
          <Flex alignItems='center'>
            <LogoContainer>
              {(this.state.darkLogos.includes(this.state.currPage) && !this.state.sticky) ?
                <NavbarAfaLogo link dark />
                :
                <NavbarAfaLogo link />
              }
            </LogoContainer>
            <DesktopNavContainer alignItems='center'>
              <div data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Box id="navMenu" ml={[0, 2, 3]}>
                <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'home'} to="/">
                  Home
            </NavbarLink>
                <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'about'} to="/about-afa">
                  About
            </NavbarLink>
                <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'map'} to="/map">
                  Map
            </NavbarLink>
                <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'donate'} to="/donate">
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
              {/* <DownArrow src={ArrowDownIcon} /> */}
            </DesktopNavContainer>
          </Flex>
          <MobileNavContainer flexDirection='row' justifyContent='space-between' mt={2}>
            <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'home'} to="/">
              Home
            </NavbarLink>
            <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'about'} to="/about-afa">
              About
            </NavbarLink>
            <NavbarLink map="true" dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'map'} to="/map">
              Map
            </NavbarLink>
            <NavbarLink dark={this.state.darkLogos.includes(this.state.currPage)} active={this.state.currPage === 'donate'} to="/donate">
              Donate
            </NavbarLink>
          </MobileNavContainer>
        </ContentLayout>
      </StyledNavbar>
    )
  }
}

export default Navbar
