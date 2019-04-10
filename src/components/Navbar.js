import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import styled from "styled-components"
import CtaButton from './CtaButton'
import fetch from 'isomorphic-unfetch';


const DonationAmount = styled.p`

`
const DonationText = styled.p`

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
    const res = await fetch(`${process.env.SERVER_GET_DONATION_DATA_URL}`, {
      crossDomain: true,
      method: 'GET',
    });
    const donationDataRes = await res.json();
    const donationAmounts = [];
    donationDataRes.data.values.map((a) => donationAmounts.push(a[0]));
    console.log('donationAmounts: ', donationAmounts);
    this.setState({
      totalDonationAmount: donationAmounts.reduce((partial_sum, a) => parseInt(partial_sum) + parseInt(a.slice(1)), 0),
    });
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

      <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/#" className="navbar-item" title="Logo">
              <img src={logo} alt="Adventures for Alopecia logo" style={{ width: '88px' }} />
            </Link>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start has-text-centered">
              {/* <Link className="navbar-item" to="/about"> */}
              <Link className="navbar-item" to="/#">
                Home
          </Link>
              {/* <Link className="navbar-item" to="/map"> */}
              <Link className="navbar-item" to="#Why-Alopecia">
                Why Alopecia
          </Link>
              <Link className="navbar-item" to="#The-Journey">
                The Journey
          </Link>
              <Link className="navbar-item" to="#About-AFA">
                About
          </Link>
              {/* <Link className="navbar-item" to="/products">
            Products
          </Link>
          <Link className="navbar-item" to="/contact">
            Contact
          </Link>
          <Link className="navbar-item" to="/contact/examples">
            Form Examples
          </Link> */}
            </div>
            <div>
              <DonationAmount>${this.state.totalDonationAmount}</DonationAmount>
              <DonationText>Raised for Alopecia</DonationText>
            </div>
            <div>
              <CtaButton text={'Donate'} to={'/donate'} type={'primary'} />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
