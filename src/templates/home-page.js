import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const HomePageTemplate = ({ title, content, contentComponent }) => {
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
      </HeroContainer>
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
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
        title
      }
    }
  }
`
