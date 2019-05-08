import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection2Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'

const Section2Heading = styled.h2`
`

const DefinitionHeading = styled.h4`
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin-bottom: 0;
  }
`

const AlopeciaDefinition = styled.p`
`

const DefinitionSourceContainer = styled.div`
  text-align: right;
`

const DefinitionSource = styled.a`
	font-size: 12px;
	font-style: italic;
	letter-spacing: 0.27px;
  line-height: 24px;
  text-align: right;
`

const AboutOrganizationComponent = ({ className, section2 }) => {
  console.log('section2: ', section2);

  return (
    <ContentLayout className={className}>
      <Section2Heading>
        {section2.section}
      </Section2Heading>
      <Flex flexWrap={['wrap','wrap','initial']}>
        <Box width={[1,1,6 / 12]} mx={[0,1,4]} px={[2,3,3]}>
          <DefinitionHeading>
            Suprisingly common
          </DefinitionHeading>
          <AlopeciaDefinition>
            {section2.definition1}
          </AlopeciaDefinition>
        </Box>
        <Box width={[1,1,6 / 12]} mx={[0,1,4]} px={[2,3,3]}>
          <DefinitionHeading>
            Emotionally devastating
          </DefinitionHeading>
          <AlopeciaDefinition>
            {section2.definition2}
          </AlopeciaDefinition>
          <DefinitionSourceContainer>
          <DefinitionSource href="https://www.naaf.org" target="_blank" rel="noopener noreferrer">
            Source: {section2.source}
          </DefinitionSource>
          </DefinitionSourceContainer>
        </Box>
      </Flex>
    </ContentLayout>
  )
}

AboutOrganizationComponent.propTypes = {
  section2: aboutSection2Type.isRequired
}

export default AboutOrganizationComponent
