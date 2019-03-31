// import React from 'react'
// import styled from "styled-components"
// import PropTypes from 'prop-types'
// import { graphql } from 'gatsby'
// import Layout from '../components/Layout'
// import Content, { HTMLContent } from '../components/Content'

// export const DonatePageTemplate = ({ heading1, description1, description2, benefits,  content, contentComponent }) => {
//   const PageContent = contentComponent || Content

//   const HeroContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `

//   // const User = props => (
//   //   <Definit>
//   //     <Avatar src={props.avatar} alt="" />
//   //     <Description>
//   //       <Username>{props.username}</Username>
//   //       <Excerpt>{props.excerpt}</Excerpt>
//   //     </Description>
//   //   </UserWrapper>
//   // )

//   return (
//     <section className="section section--gradient">
//       <HeroContainer>
//         <PageContent className="content" content={content} />
//         <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
//             {heading1}
//         </h2>
//         {description1}
//         {description2}
//       </HeroContainer>
//       <div className="container">
//         <div className="columns">
//           <div className="column is-10 is-offset-1">
//             <div className="section">
//               <PageContent className="content" content={content} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// DonatePageTemplate.propTypes = {
//   content: PropTypes.string,
//   contentComponent: PropTypes.func,
//   heading1: PropTypes.string.isRequired,
//   description1: PropTypes.string.isRequired,
//   description2: PropTypes.string.isRequired,
//   benefits: PropTypes.shape({
//     benefitTitle: PropTypes.string,
//     benefit1: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string,
//       image: PropTypes.string
//     }),
//     benefit2: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string,
//       image: PropTypes.string
//     }),
//     benefit3: PropTypes.shape({
//       title: PropTypes.string,
//       description: PropTypes.string,
//       image: PropTypes.string
//     })
//   })
// }

// const DonatePage = ({ data }) => {
//   console.log('Donate data: ', data);
//   const { markdownRemark: markdownData } = data
//   const frontmatter = markdownData.frontmatter;
//   const benefits = frontmatter.benefits;
//   return (
//     <Layout>
//       <DonatePageTemplate
//         contentComponent={HTMLContent}
//         heading1={frontmatter.heading1}
//         description1={frontmatter.description1}
//         description2={frontmatter.description2}
//         benefits={benefits}
//       />
//     </Layout>
//   )
// }

// DonatePage.propTypes = {
//   data: PropTypes.object.isRequired,
// }

// export default DonatePage

// export const DonatePageQuery = graphql`
//   query DonatePage($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       html
//       frontmatter {
//         heading1
//         description
//         description2
//         benefits {
//           benefitTitle
//           benefit1 {
//             title
//             description
//           }
//           benefit2 {
//             title
//             description
//           }
//           benefit3 {
//             title
//             description
//           }
//         }
//       }
//     }
//   }
// `
