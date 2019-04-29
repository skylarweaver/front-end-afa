import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import { donatePropTypes } from '../proptypes/donate-proptypes'
import Content, { HTMLContent } from '../components/Content'
import { Flex, Box } from '@rebass/grid'
import DonateContentComponent from '../components/donate/DonateContentComponent';
import DonateFormComponent from '../components/donate/DonateFormComponent';
import RecentDonorsComponent from '../components/donate/RecentDonorsComponent';

const DonatePage = ({ data }) => {
  console.log('Donate data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const heading = frontmatter.heading
  const description = frontmatter.description;
  const usdDonation = frontmatter.usdDonation;
  const cryptoDonation = frontmatter.cryptoDonation;

  const content = markdownData.html
  const contentComponent = HTMLContent
  const DonateContent = contentComponent || Content

  const StyledDonateContentComponent = styled(DonateContentComponent)`
  `;
  const StyledDonateFormComponent = styled(DonateFormComponent)`
  `;

  return (
    <Layout>
      <Flex>
        <Box width={5 / 12}>
          <StyledDonateContentComponent heading={heading} description={description}>
            <DonateContent content={description} />
            {/* <DonateContent content={content} /> */}
          </StyledDonateContentComponent>
        </Box>
        <Box width={7 / 12}>
          <StyledDonateFormComponent usdDonation={usdDonation} cryptoDonation={cryptoDonation}/>
        </Box>
      </Flex>
      <RecentDonorsComponent/>
    </Layout>
  )
}

export default DonatePage

DonatePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: donatePropTypes.isRequired,
    }).isRequired
  }).isRequired,
}

export const DonatePageQuery = graphql`
  query DonatePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        heading
        description
        usdDonation {
          usdDonationTitle
          legalText
          anonymous {
            label
          }
          field1 {
            label
            sublabel
          }
          field2 {
            label
            sublabel
          }
          field3 {
            label
          }
          field4 {
            label
          }
          field5 {
            label
          }
          field6 {
            label
          }
        }
        cryptoDonation {
          cryptoDonationTitle
          legalText
          step1 {
            cryptos {
              address 
              name
            }
          }
          step2 {
            label
          }
          step3 {
            label
          }
        }
      }
    }
  }
`
