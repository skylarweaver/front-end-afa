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

const DonatePage = ({ data }) => {
  console.log('Home data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const heading1 = frontmatter.heading1;
  const description2 = frontmatter.description2;

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
          <StyledDonateContentComponent heading1={heading1}>
            <DonateContent content={content} />
          </StyledDonateContentComponent>
        </Box>
        <Box width={7 / 12}>
          <StyledDonateFormComponent />
        </Box>
      </Flex>
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
        heading1
        description2
        benefits {
          benefitTitle
          benefit1 {
            title
            description
          }
          benefit2 {
            title
            description
          }
          benefit3 {
            title
            description
          }
        }
      }
    }
  }
`
