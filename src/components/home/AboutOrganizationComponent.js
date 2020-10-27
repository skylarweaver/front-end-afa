import React from 'react'
import styled from 'styled-components'
import { homeSection4Type } from '../../proptypes/home-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import { graphql, StaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import ContentLayout from '../ContentLayout'
import DonationsRaised from '../DonationsRaised'
import AfaLogo from '../AfaLogo'
import Link from '../GatsbyLink'
import MarkdownContent from '../MarkdownContent'

const AboutOrgTitle = styled.h2`
  margin-top: 120px;
  // margin-left: ${props => props.theme.space[4]}px;
  color: ${props => props.theme.tertiary};
`

const PhotoSource = styled.p`
  font-size: 12px;
  font-style: italic;
  letter-spacing: 0.27px;
  line-height: 24px;
  position: absolute;
  bottom: 0;
  right: 20px;
`

const AboutOrganizationComponent = ({ className, section4, donationAmount }) => {
  return (

    <StaticQuery query={graphql`
      query {
        desktop: file(relativePath: { eq: "bg@3x.png" }) {
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
              <AfaLogo dark />
              <DonationsRaised donationAmount={donationAmount} />
              <AboutOrgTitle name="About-AFA">
                {section4.section}
              </AboutOrgTitle>
              <Flex>
                <Box width={[1, 1, 9 / 12, 5 / 12]}>
                    <MarkdownContent content={section4.content1} />
                    <MarkdownContent content={section4.content2} />
                    <MarkdownContent content={section4.content3} />
                </Box>
              </Flex>
              <Flex mt={[2,2,3]}>
                <Box>
                  <CtaButton text={section4.learnMoreCTAText} to={'/about-afa'} type={'secondary'} />
                </Box>
              </Flex>
              <PhotoSource>
                Photo Source: <Link to="http://www.naaf.org">NAAF.org</Link>
              </PhotoSource>
            </ContentLayout>
          </BackgroundImage>
        )
      }}
    />
  )
}

AboutOrganizationComponent.propTypes = {
  section4: homeSection4Type.isRequired
}

export default AboutOrganizationComponent
