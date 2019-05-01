import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import styled from "styled-components"
import CtaButton from './CtaButton'
import axios from 'axios';

const StyledNavbar = styled.nav`
  width: 100%;
  overflow: hidden;
  background-color: #333;
`
const NavbarLink = styled(Link)`
  float: left;
  display: block;
  color: ${props => props.theme.primary};
  text-align: center;
  padding: 14px;
  text-decoration: none;
`
const Logo = styled.img`
  height: 30px;
`
const LinkSection = styled.div`
  float: left;
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
    this.getCurrentDonationAmount();
    this.setupHamburgerFunctionality();
  }

  async getCurrentDonationAmount() {
    try {
      const donationDataRes = await axios.get(`${process.env.SERVER_GET_DONATION_DATA_URL}`)
      const donationAmounts = [];
      donationDataRes.data.values.map((a) => donationAmounts.push(a[0]));
      console.log('Donation values: ', donationDataRes.data.values);
      const totalDonationAmount = donationAmounts.reduce((partial_sum, donationString) => {
        const donationInt = parseInt(donationString.slice(1).replace(/,/g, ''));
        return partial_sum + donationInt;
      }, 0);
      this.setState({
        totalDonationAmount: totalDonationAmount.toLocaleString(),
      });
    } catch (error) {
      console.log('error: ', error);
      this.setState({
        totalDonationAmount: '...........',
      });
    }
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

      <StyledNavbar className="navbar is-transparent" role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            <NavbarLink to="/#" className="navbar-item" title="Logo">
              <Logo src={logo} alt="Adventures for Alopecia logo" style={{ width: '88px' }} />
            </NavbarLink>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <LinkSection className="navbar-start has-text-centered">
              <NavbarLink className="navbar-item" to="/#">
                Home
              </NavbarLink>
              <NavbarLink className="navbar-item" to="/#Why-Alopecia">
                Why Alopecia
              </NavbarLink>
              <NavbarLink className="navbar-item" to="/#The-Journey">
                The Journey
              </NavbarLink>
              <NavbarLink className="navbar-item" to="/#About-AFA">
                About
              </NavbarLink>
            </LinkSection>
            <DonateSection>
              <DonateTextSection>
                <DonationAmount>${this.state.totalDonationAmount}</DonationAmount>
                <br></br>
                <DonationText>Raised for Alopecia</DonationText>
              </DonateTextSection>
                <CtaButton text={'Donate'} to={'/donate'} type={'primary'} />
            </DonateSection>
          </div>
        </div>
      </StyledNavbar>
    )
  }
}

export default Navbar
