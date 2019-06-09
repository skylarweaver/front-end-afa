import React from 'react'
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
import ContentLayout from '../components/ContentLayout';
import Navbar from '../components/Navbar'

const DonateTitle = styled(Box)`

`

const DonatePage = ({ data }) => {
  console.log('Donate data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const heading = frontmatter.heading
  const description = frontmatter.description;
  const usdDonation = frontmatter.usdDonation;
  const cryptoDonation = frontmatter.cryptoDonation;

  // const content = markdownData.html
  const contentComponent = HTMLContent
  const DonateContent = contentComponent || Content

  const StyledDonateContentComponent = styled(DonateContentComponent)`
  `;
  const StyledDonateFormBox = styled(Box)`
    max-width: 700px;
  `;

  return (
    <Layout>
      <ContentLayout topSection right={[2, 4, 6]} left={[2, 4, 6]}>
        <DonateTitle m={[0, 0, 3]}>
          <h1>{heading}</h1>
        </DonateTitle>
        <Flex flexWrap={['wrap', 'wrap', 'initial']}>
          <StyledDonateFormBox width={[1, 1, 5 / 12]} m={[0, 0, 3]}>
            <DonateFormComponent usdDonation={usdDonation} cryptoDonation={cryptoDonation} />
          </StyledDonateFormBox>
          <Box width={[1, 1, 4 / 12]} m={[0, 0, 3]} mt={[0, 0, 5]} pl={[0, 0, 2]}>
            <StyledDonateContentComponent heading={heading} description={description}>
              <DonateContent content={description} />
            </StyledDonateContentComponent>
          </Box>
        </Flex>
        <RecentDonorsComponent />
      </ContentLayout>
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
            notesLabel
            nameLabel
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
            label
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
