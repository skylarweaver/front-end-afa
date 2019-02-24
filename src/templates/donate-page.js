import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const DonatePageTemplate = ({ heading1, description1, description2, section2, section3,  content, contentComponent }) => {
  const PageContent = contentComponent || Content

  const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
  const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
  &:last-child {
    margin-bottom: 0;
  }
`
  const Avatar = styled.img`
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
`
  const Description = styled.div`
  flex: 1;
  margin-left: 18px;
  padding: 12px;
`
  const Username = styled.h2`
  margin: 0 0 12px 0;
  padding: 0;
`
  const Excerpt = styled.p`
  margin: 0;
`

  // const User = props => (
  //   <Definit>
  //     <Avatar src={props.avatar} alt="" />
  //     <Description>
  //       <Username>{props.username}</Username>
  //       <Excerpt>{props.excerpt}</Excerpt>
  //     </Description>
  //   </UserWrapper>
  // )

  return (
    <section className="section section--gradient">
      <HeroContainer>
        <PageContent className="content" content={content} />
        <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            {heading1}
        </h2>
        {description1}
        {description2}
      </HeroContainer>
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// DonatePageTemplate.propTypes = {
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
//   heading1: PropTypes.string.isRequired,
//   description1: PropTypes.string.isRequired,
//   description2: PropTypes.string.isRequired,
//   section3: PropTypes.shape({
//     section: PropTypes.string,
//     heading1: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string
//     }),
//     heading2: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string
//     }),
//     heading3: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string
//     })
//   }),
//   section4: PropTypes.shape({
//     section: PropTypes.string,
//     director1: PropTypes.shape({
//       name: PropTypes.string,
//       description: PropTypes.string
//     }),
//     director2: PropTypes.shape({
//       name: PropTypes.string,
//       description: PropTypes.string
//     }),
//     director3: PropTypes.shape({
//       name: PropTypes.string,
//       description: PropTypes.string
//     }),
//     director4: PropTypes.shape({
//       name: PropTypes.string,
//       description: PropTypes.string
//     }),
//     director5: PropTypes.shape({
//       name: PropTypes.string,
//       description: PropTypes.string
//     })
//   })
// }

const DonatePage = ({ data }) => {
  console.log('Donate data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  // const section2 = frontmatter.section2;
  // const section3 = frontmatter.section3;
  return (
    <Layout>
      <DonatePageTemplate
        contentComponent={HTMLContent}
        heading1={frontmatter.heading1}
        description1={frontmatter.description1}
        description2={frontmatter.description2}
        // section2={section2}
        // section3={section3}
        // content={data.html}
      />
    </Layout>
  )
}

DonatePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DonatePage

export const DonatePageQuery = graphql`
  query DonatePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        heading1
        description1
        description2

      }
    }
  }
`
// benefits {
//   benefitTitle
//   benefit1 {
//     title
//     description
//     image
//   }
//   benefit2 {
//     title
//     description
//     image
//   }
//   benefit3 {
//     title
//     description
//     image
//   }
// }