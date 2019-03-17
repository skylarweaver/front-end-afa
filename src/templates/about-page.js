import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ heading1, description1, description2, section2, section3,  content, contentComponent }) => {
  const PageContent = contentComponent || Content

  const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

AboutPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  heading1: PropTypes.string.isRequired,
  description1: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  section3: PropTypes.shape({
    section: PropTypes.string,
    heading1: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    heading2: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }),
    heading3: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    })
  }),
  section4: PropTypes.shape({
    section: PropTypes.string,
    director1: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director2: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director3: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director4: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director5: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    })
  })
}

const AboutPage = ({ data }) => {
  console.log('About data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const section2 = frontmatter.section2;
  const section3 = frontmatter.section3;
  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        heading1={frontmatter.heading1}
        description1={frontmatter.description1}
        description2={frontmatter.description2}
        section2={section2}
        section3={section3}
        content={data.html}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

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
        section4 {
          section
          director1 {
            name
            description
          }
          director2 {
            name
            description
          }
          director3 {
            name
          }
          director4 {
            name
          }
          director5 {
            name
          }
        }
      }
    }
  }
`
