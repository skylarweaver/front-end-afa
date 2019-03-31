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

const DonatePage = ({ data }) => {
  console.log('Home data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const heading1 = frontmatter.heading1;
  const description = frontmatter.description;
  const description2 = frontmatter.description2;

  const StyledDonateContentComponent = styled(DonateContentComponent)`
  `;

  return (
    <Layout>
      <Flex>
        <Box width={5/12}>
          <StyledDonateContentComponent heading1={heading1} description={description} description2={description2} />
        </Box>
      </Flex>
    </Layout>
  )
}

export default DonatePage 

DonatePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
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
        description
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