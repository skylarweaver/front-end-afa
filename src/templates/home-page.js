import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const HomePageTemplate = ({ title, content, contentComponent, heroHeading, description1, description2, section2, section3, section4 }) => {
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
        <PageContent className="content" />
        <h1>{heroHeading}</h1>
        <p>{description1}</p>
        <p>{description2}</p>
      </HeroContainer>
      {section2.section}
      {section2.heading.belief}
      {section2.heading2.belief}
      {section2.heading3.belief}
      {section3.section}
      {section3.content.content1}
      {section3.content.content2}
      {section4.section}
      {/* {section4.content.sponsor1.name}
      {section4.content.sponsor2.name}
      {section4.content.sponsor3.name} */}
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HomePageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  heroHeading: PropTypes.string.isRequired,
  description1: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  section2: PropTypes.shape({
    section: PropTypes.string,
    heading: PropTypes.shape({ belief: PropTypes.string }),
    heading2: PropTypes.shape({ belief: PropTypes.string }),
    heading3: PropTypes.shape({ belief: PropTypes.string })
  }),
  section3: PropTypes.shape({
    section: PropTypes.string,
    content: PropTypes.shape({
      content1: PropTypes.string,
      content2: PropTypes.string
    })
  }),
  section4: PropTypes.shape({
    section: PropTypes.string,
    content: PropTypes.shape({
      sponsor1: PropTypes.shape({ name: PropTypes.string }),
      sponsor2: PropTypes.shape({ name: PropTypes.string }),
      sponsor3: PropTypes.shape({ name: PropTypes.string })
    })
  })
}

const HomePage = ({ data }) => {
  console.log('Home data: ', data);
  const { markdownRemark: markdownData } = data
  const frontmatter = markdownData.frontmatter;
  const section2 = frontmatter.section2;
  const section3 = frontmatter.section3
  const section4 = frontmatter.section3
  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={markdownData.frontmatter.title}
        content={markdownData.html}
        heroHeading={frontmatter.heroHeading}
        description1={frontmatter.description1}
        description2={frontmatter.description2}
        section2={section2}
        section3={section3}
        section4={section4}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        heroHeading
        description1
        description2
        section2 {
          section
          heading {
            belief
          }
          heading2 {
            belief
          }
          heading3 {
            belief
          }
        }
        section3 {
          section
          content {
            content1
            content2
          }
        }
        section4 {
          section
          content {
            sponsor1 {
              name
            }
            sponsor2 {
              name
            }
            sponsor3 {
              name
            }
          }
        }
      }
    }
  }
`
