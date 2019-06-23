import React from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { aboutSection1Type, aboutSection2Type, aboutSection3Type,aboutPartnersSectionType, aboutSection4Type, aboutOurVolunteersType } from '../proptypes/about-proptypes'
import Section1 from '../components/about/Section1';
import Section2 from '../components/about/Section2';
import Section3 from '../components/about/Section3';
import OurPartners from '../components/about/OurPartners';
import Section4 from '../components/about/Section4';
import OurVolunteers from '../components/about/OurVolunteers';


const AboutPage = class extends React.Component {
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
    console.log('About data: ', this.props.data);
    const { markdownRemark: markdownData } = this.props.data
    const frontmatter = markdownData.frontmatter;
    const section1 = frontmatter.section1;
    const section2 = frontmatter.section2;
    const section3 = frontmatter.section3;
    const aboutPartnersSection = frontmatter.aboutPartnersSection;
    const section4 = frontmatter.section4;
    const ourVolunteers = frontmatter.ourVolunteers;

    const StyledSection1 = styled(Section1)`
    min-height: 500px;
    max-height: 900px;
    background-color: #01babd6b;
    background-image: linear-gradient(to left,rgba(0,125,130,0),#01babd26 64%,#01babd33);
    @media (max-width: ${props => props.theme.breakpoints[2]}) {
      max-height: initial;
    }
  `;
    const StyledSection2 = styled(Section2)`
  `;
    const StyledSection3 = styled(Section3)`
    background-color: #008b90;
    background-image: linear-gradient(to left, rgba(0, 125, 130, 0), #016165 64%, #016468);
    @media (max-width: 374px) {
      background-color: #018388;
    }
  `;
    const StyledSection4 = styled(Section4)`
  `;

    return (
      <Layout>
        <StyledSection1 section1={section1} donationAmount={this.state.totalDonationAmount} />
        <StyledSection2 section2={section2} />
        <StyledSection3 section3={section3} />
        <OurPartners aboutPartnersSection={aboutPartnersSection} />
        <StyledSection4 section4={section4} />
        <OurVolunteers ourVolunteers={ourVolunteers} />
      </Layout>
    )
  }
}

export default AboutPage;

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        content: PropTypes.object,
        contentComponent: PropTypes.func,
        section1: aboutSection1Type.isRequired,
        section2: aboutSection2Type.isRequired,
        section3: aboutSection3Type.isRequired,
        aboutPartnersSection: aboutPartnersSectionType.isRequired,
        section4: aboutSection4Type.isRequired,
        ourVolunteers: aboutOurVolunteersType.isRequired,
      }).isRequired
    }).isRequired
  }).isRequired,
}

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        section1 {
          heading1
          description1
        }
        section2 {
          section
          definition1
          definition2
          definition3
          source
        }
        section3 {
          section
          belief1 {
            heading
            description
          }
          belief2 {
            heading
            description
          }
          belief3 {
            heading
            description
          }
        }
        aboutPartnersSection {
          section
          partner1 {
            heading
            description
          }
          partner2 {
            heading
            description
          }
        }
        section4 {
          section
          director1 {
            name
            role
            description
          }
          director2 {
            name
            role
            description
          }
          director3 {
            name
            role
          }
          director4 {
            name
            role
          }
          director5 {
            name
            role
          }
          director6 {
            name
            role
          }
        }
        ourVolunteers {
          section
          volunteers {
            name
            role
            linkedIn
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
