import React from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { homeSection1Type, homeSection2Type, homeSection3Type, homeSection4Type, homeSection5Type } from '../proptypes/home-proptypes'
import HeroComponent from '../components/home/HeroComponent';
import WhySupportComponent from '../components/home/WhySupportComponent';
import JourneyComponent from '../components/home/JourneyComponent';
import AboutOrganizationComponent from '../components/home/AboutOrganizationComponent';
import SponsorsComponent from '../components/home/SponsorsComponent';

const HomePage = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDonationAmount: '...........',
    };
  }

  componentDidMount() {
    this.getCurrentDonationAmount();
  }

  async getCurrentDonationAmount() {
    try {
      const donationDataRes = await axios.get(`${process.env.SERVER_GET_DONATION_DATA_URL}`)
      const donationAmounts = [];
      donationDataRes.data.values.map((a) => donationAmounts.push(a[0]));
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

  render() {
    console.log('Home data: ', this.props.data);
    const { markdownRemark: markdownData } = this.props.data
    const frontmatter = markdownData.frontmatter;
    const section1 = frontmatter.section1;
    const section2 = frontmatter.section2;
    const section3 = frontmatter.section3;
    const section4 = frontmatter.section4;
    const section5 = frontmatter.section5;
  
    const StyledHeroComponent = styled(HeroComponent)`
      height: 100vh;
      min-height: 825px;
      max-height: 900px;
      @media (max-width: 1000px) {
        height: initial;
        min-height: 825px;
        max-height: 925px;;
      }
      @media (max-width: ${props => props.theme.breakpoints[1]}) {
        height: initial;
        max-height: initial;
        min-height: initial;
      }
    `;
    const StyledWhySupportComponent = styled(WhySupportComponent)`
      height: 100vh;
      min-height: 825px;
      max-height: 950px;
      @media (max-width: ${props => props.theme.breakpoints[1]}) {
        height: initial;
        max-height: initial;
        min-height: initial;
      }
    `;
    const StyledJourneyComponent = styled(JourneyComponent)`
      height: 100vh;
      min-height: 825px;
      max-height: 900px;
      @media (max-width: ${props => props.theme.breakpoints[1]}) {
        height: initial;
        max-height: initial;
        min-height: initial;
      }
    `;
    const StyledAboutOrganizationComponent = styled(AboutOrganizationComponent)`
      height: 100vh;
      min-height: 825px;
      max-height: 900px;
      @media (max-width: ${props => props.theme.breakpoints[1]}) {
        height: initial;
        max-height: initial;
        min-height: initial;
      }
    `;
    const StyledSponsorsComponent = styled(SponsorsComponent)`
      min-height: 825px;
      background-color: #ffffff;
    `;
    return (
      <Layout>
        <StyledHeroComponent section1={section1} donationAmount={this.state.totalDonationAmount}/>
        <StyledWhySupportComponent section2={section2} donationAmount={this.state.totalDonationAmount} />
        <StyledJourneyComponent section3={section3} donationAmount={this.state.totalDonationAmount} />
        <StyledAboutOrganizationComponent section4={section4} donationAmount={this.state.totalDonationAmount} />
        <StyledSponsorsComponent section5={section5} donationAmount={this.state.totalDonationAmount} />
      </Layout>
    )
  }
}

export default HomePage

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        content: PropTypes.object,
        contentComponent: PropTypes.func,
        section1: homeSection1Type.isRequired,
        section2: homeSection2Type.isRequired,
        section3: homeSection3Type.isRequired,
        section4: homeSection4Type.isRequired,
        section5: homeSection5Type.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired,
}

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        section1 {
          heroHeading1
          heroHeading2
          heroHeading3
          description1
          donationText1
          donationText2
          donateCTAtext
          backgroundImage {
            childImageSharp {
              fluid(
                maxWidth: 1600,
                quality: 100,
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        section2 {
          section
          reason1 {
            belief
            description1
            description2
          }
          reason2 {
            belief
            description1
            description2
          }
          reason3 {
            belief
            description1
            description2
          }
        }
        section3 {
          section
          ctaText
          content {
            content1
            content2
            goal1
            goal2
            goal3
          }
        }
        section4 {
          section
          content
          donateCTAtext
          learnMoreCTAText
        }
        section5 {
          section
          sponsorCTAText
        }
      }
    }
  }
`

              // duotone: {
              //   highlight: "#a4ded4",
              //   shadow: "#4d384f"
              // }