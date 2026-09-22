import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"
import { Flex, Box } from '@rebass/grid'
import AfaLogo from './AfaLogo';
import ContentLayout from './ContentLayout'

const StyledNavbar = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  background-color: ${props => (props.sticky || props.map) ? props.theme.secondary : 'rgba(0, 0, 0, 0)'}; 
  transition: ${props => (props.sticky || props.map) ? 'background-color 400ms ease' : 'background-color 0ms ease'}; 
  box-shadow: ${props => (props.sticky || props.map) ? '0 3px 3px -2px rgba(0,0,0,.2)' : 'initial'}; 
  transition: ${props => (props.sticky || props.map) ? 'box-shadow 300ms ease' : 'box-shadow  0ms ease'}; 
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
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    padding: 0;
    margin: 0;
    font-size: 18px;
  }
`

// Pages that show the dark logo and primary-colored links over a light background
const DARK_LOGO_PAGES = ['about', 'map', 'donate', 'report']

const NAV_ITEMS = [
  { page: 'home', label: 'Home', to: '/' },
  { page: 'about', label: 'About', to: '/about-afa' },
  { page: 'map', label: 'Map', to: '/map' },
  { page: 'report', label: 'Report', to: '/final-report' },
  { page: 'donate', label: 'Donate', to: '/donate' },
]

const PAGE_BY_PATH = {
  '/about-afa': 'about',
  '/map': 'map',
  '/final-report': 'report',
  '/donate': 'donate',
}

const Navbar = class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sticky: false,
      currPage: 'home',
    };
    this.changeStickyHeader = this.changeStickyHeader.bind(this);
  }

  componentDidMount() {
    this.determineCurrentPage();
    window.addEventListener('scroll', this.changeStickyHeader, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeStickyHeader, false) // Cancel scroll listener
    window.cancelAnimationFrame(this.state.timeout); // Cancel repaint request
  }

  determineCurrentPage() {
    let currPath = window.location.pathname;
    if (currPath !== '/' && currPath.slice(-1) === '/') { // In prod, refreshing appends '/' to the end of the path
      currPath = currPath.slice(0, -1);
    }
    const currPage = PAGE_BY_PATH[currPath] || 'home';
    if (currPage === 'map' && !this.state.sticky) {
      this.setState({ currPage, sticky: true }); // Set sticky header on map
    } else {
      this.setState({ currPage });
    }
  }

  changeStickyHeader() {
    // Sticky header (w/ dark background on map page all the time)
    if (this.state.currPage === 'map' && this.state.sticky) return; // Already sticky on map page
    // Not map page, so determine if nav should be sticky when scrolling
    if (window.pageYOffset > 0) {
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  }

  renderLinks() {
    const dark = DARK_LOGO_PAGES.includes(this.state.currPage) ? 1 : 0
    return NAV_ITEMS.map(item => (
      <NavbarLink key={item.page} dark={dark} active={this.state.currPage === item.page ? 1 : 0} to={item.to}>
        {item.label}
      </NavbarLink>
    ))
  }

  render() {
    const showDarkLogo = DARK_LOGO_PAGES.includes(this.state.currPage) && !this.state.sticky
    return (
      <StyledNavbar className={this.props.className} sticky={this.state.sticky} role="navigation" aria-label="main-navigation">
        <ContentLayout top={this.state.sticky ? [2, 2, 2] : [3, 3, 4]} bottom={this.state.sticky ? [2, 2, 2] : [3, 3, 3]}>
          <Flex alignItems='center'>
            <LogoContainer>
              {showDarkLogo ? <NavbarAfaLogo link dark /> : <NavbarAfaLogo link />}
            </LogoContainer>
            <DesktopNavContainer alignItems='center'>
              <Box id="navMenu" ml={[0, 2, 3]}>
                {this.renderLinks()}
              </Box>
            </DesktopNavContainer>
          </Flex>
          <MobileNavContainer flexDirection='row' justifyContent='space-between' mt={2}>
            {this.renderLinks()}
          </MobileNavContainer>
        </ContentLayout>
      </StyledNavbar>
    )
  }
}

export default Navbar
