import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo-white@3x.png'
import styled from "styled-components"
import CtaButton from './CtaButton'
import { Flex, Box } from '@rebass/grid'
import AfaLogo from './AfaLogo';
import axios from 'axios';

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
  text-align: center;
  padding: 14px;
  margin: 5px;
  color: ${props => props.dark ? props.theme.primary: props.theme.white};
  &:hover {
    color: ${props => props.dark ? props.theme.secondary : props.theme.primary};
    text-decoration: none;
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    padding: 0 4px;
    margin: 0 1px;
    display: ${props => props.donate ? 'none' : 'initial'}
  }
`

const DonateSection = styled.div`
  float: right;
  display: flex;
`
const DonateTextSection = styled.p`
`
const DonationAmount = styled.span`

`
const DonationText = styled.span`

`

const Navbar = class extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDonationAmount: '...........',
    };
  }

  componentDidMount() {
    // this.getCurrentDonationAmount();
    this.setupHamburgerFunctionality();
  }

  // async getCurrentDonationAmount() {
  //   try {
  //     const donationDataRes = await axios.get(`${process.env.SERVER_GET_DONATION_DATA_URL}`)
  //     const donationAmounts = [];
  //     donationDataRes.data.values.map((a) => donationAmounts.push(a[0]));
  //     console.log('Donation values: ', donationDataRes.data.values);
  //     const totalDonationAmount = donationAmounts.reduce((partial_sum, donationString) => {
  //       const donationInt = parseInt(donationString.slice(1).replace(/,/g, ''));
  //       return partial_sum + donationInt;
  //     }, 0);
  //     this.setState({
  //       totalDonationAmount: totalDonationAmount.toLocaleString(),
  //     });
  //   } catch (error) {
  //     console.log('error: ', error);
  //     this.setState({
  //       totalDonationAmount: '...........',
  //     });
  //   }
  // }

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
              <NavbarLink dark={this.props.dark } to="/about-afa">
                About
              </NavbarLink>
              <NavbarLink dark={this.props.dark } to="/map">
                Map
              </NavbarLink>
              <NavbarLink donate dark={this.props.dark } to="/donate">
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



// <NavbarLink to="/#">
// About
// </NavbarLink>
// <NavbarLink to="/#Why-Alopecia">
// Map
// </NavbarLink>
// <NavbarLink to="/#The-Journey">
// Donate
// </NavbarLink>
// <NavbarLink to="/#About-AFA">
// About
// </NavbarLink>