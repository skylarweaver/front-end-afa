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
import AfaLogo from '../AfaLogo'
import DonationsRaised from '../DonationsRaised'

const JourneyTitle = styled.h2`
  margin-top: 120px;
  color: ${props => props.theme.tertiary};
`

const JourneyDescription = styled.p`
`

const GoalListItem =styled.li`
  margin-bottom: 10px;
`

const JourneyComponent = ({ className, section3, donationAmount }) => {
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
              <AfaLogo dark/>
              <DonationsRaised donationAmount={donationAmount} />
              <JourneyTitle name="The-Journey">
                {section3.section}
              </JourneyTitle>
              <Flex>
                <Box width={[1,1,6 / 12]}>
                  <JourneyDescription>
                    {section3.content.content1}
                    <br></br>
                    {section3.content.content2}
                    <ul>
                      <GoalListItem>{section3.content.goal1}</GoalListItem>
                      <GoalListItem>{section3.content.goal2}</GoalListItem>
                      <GoalListItem>{section3.content.goal3}</GoalListItem>
                    </ul>
                  </JourneyDescription>
                </Box>
                <Box width={[1,1,6 / 12]}>
                  {/* <JourneyMap /> */}
                </Box>
              </Flex>
              <Flex alignItems='center'>
                <CtaButton text={section3.ctaText} to={'/map'} type={'secondary'} />
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
