import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { homeSection3Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import MailchimpSubscribe from '../MailchimpSubscribe'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'

const JourneyTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const JourneyDescription = styled.p`
	font-size: 16px;
	line-height: 24px;
`

const JourneyMap = styled.p`

`

const JourneyComponent = ({ className, section3 }) => {
  console.log('section3: ', section3);

  return (

    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "bg-map@3x.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
      render={data => {
        const imageData = data.desktop.childImageSharp.fluid
        return (
          <BackgroundImage Tag="section"
            className={className}
            fluid={imageData}
          >
            <ContentLayout>
              <JourneyTitle name="The-Journey">
                {section3.section}
              </JourneyTitle>
              <Flex>
                <Box width={6 / 12}>
                  <JourneyDescription>
                    {section3.content.content1}
                    {section3.content.content2}
                    {section3.content.goal1}
                    {section3.content.goal2}
                    {section3.content.goal3}
                  </JourneyDescription>
                </Box>
                <Box width={6 / 12}>
                  <JourneyMap>
                    MAP
                  </JourneyMap>
                </Box>
              </Flex>
              <Flex alignItems='center'>
                <CtaButton text={section3.ctaText} to={'/map'} type={'primary'} />
                <MailchimpSubscribe />
              </Flex>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

JourneyComponent.propTypes = {
  section3: homeSection3Type.isRequired
}

export default JourneyComponent
