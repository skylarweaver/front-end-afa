import React from 'react'
import Image from 'gatsby-image/withIEPolyfill'
import styled from 'styled-components'
import { homeSection3Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
// import MailchimpSubscribe from '../MailchimpSubscribe'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'
import AfaLogo from '../AfaLogo'
import DonationsRaised from '../DonationsRaised'
import MarkdownContent from '../MarkdownContent'

const JourneyTitle = styled.h2`
  margin-top: 40px;
  color: ${props => props.theme.tertiary};
`
const MapFlexContent = styled(Flex)`
  max-height: 100%;
`

const JourneyDescription = styled.div`
`

const GoalListItem = styled.li`
  margin-bottom: 10px;
`

const MapImage = styled(Image)`
  height: 100%;
`

const JourneyComponent = ({ className, section3, donationAmount }) => {

  return (

    <StaticQuery query={graphql`
      query {
        background: file(relativePath: { eq: "bg-map@3x.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        map: file(relativePath: { eq: "map@3x.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
      render={data => {
        const backgroundImageData = data.background.childImageSharp.fluid
        const mapImageData = data.map.childImageSharp.fluid
        return (
          <BackgroundImage Tag="section"
            className={className}
            fluid={backgroundImageData}
          >
            <ContentLayout>
              <MapFlexContent>
                <Box width={[1, 1, 6 / 12]}>
                  <AfaLogo dark />
                  <DonationsRaised donationAmount={donationAmount} />
                  <JourneyTitle name="The-Journey">
                    {section3.section}
                  </JourneyTitle>
                  <JourneyDescription>
                    <p>
                      {section3.content.content1}
                    </p>
                    <ul>
                      <GoalListItem>
                        <MarkdownContent content={section3.content.goal1} />
                      </GoalListItem>
                      <GoalListItem>
                        <MarkdownContent content={section3.content.goal2} />
                      </GoalListItem>
                      <GoalListItem>
                        <MarkdownContent content={section3.content.goal3} />
                      </GoalListItem>
                    </ul>
                    <p>
                      {section3.content.content2}
                    </p>
                  </JourneyDescription>
                  <Flex alignItems='center' mt={[2, 2, 4]}>
                    <CtaButton text={section3.ctaText} to={'https://mailchi.mp/2290b7299c97/afa-adventure-report-2023'} type={'primary'} />
                    {/* <MailchimpSubscribe /> */}
                  </Flex>
                </Box>
                <Box width={[0, 0, 6 / 12]}>
                  <MapImage
                    fluid={mapImageData}
                    alt="Pan-American Highway Map"
                    objectFit="contain" />
                </Box>
              </MapFlexContent>
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
