import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection2Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'

const Seciton2Heading = styled.h2`
`

const DefinitionHeading = styled.h4`
`

const AlopeciaDefinition = styled.p`
`

const DefinitionSource = styled.p`
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
      <Seciton2Heading>
        {section2.section}
      </Seciton2Heading>
      <Flex>
        <Box width={6 / 12} mx={4} px={3}>
          <DefinitionHeading>
            Suprisingly common
          </DefinitionHeading>
          <AlopeciaDefinition>
            {section2.definition1}
          </AlopeciaDefinition>
        </Box>
        <Box width={6 / 12} mx={4} px={3}>
          <DefinitionHeading>
            Emotionally devastating
          </DefinitionHeading>
          <AlopeciaDefinition>
            {section2.definition2}
          </AlopeciaDefinition>
          <DefinitionSource>
            <a href="https://www.naaf.org" target="_blank">{section2.source}</a>
          </DefinitionSource>
        </Box>
      </Flex>
    </ContentLayout>
  )
}

AboutOrganizationComponent.propTypes = {
  section2: aboutSection2Type.isRequired
}

export default AboutOrganizationComponent
