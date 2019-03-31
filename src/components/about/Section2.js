import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection2Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

const Seciton2Heading = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const AlopeciaDefinition = styled.p`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`

const DefinitionSource = styled.p`
	font-size: 12px;
	font-style: italic;
	letter-spacing: 0.27px;
	line-height: 24px;
`

const AboutOrganizationComponent = ({ className, section2 }) => {
  console.log('section2: ', section2);

  return (
    <div className={className}>
      <Seciton2Heading>
        {section2.section}
      </Seciton2Heading>
      <Flex>
        <Box width={6 / 12}>
          <AlopeciaDefinition>
            {section2.definition1}
          </AlopeciaDefinition>
        </Box>
        <Box width={6 / 12}>
          <AlopeciaDefinition>
            {section2.definition2}
          </AlopeciaDefinition>
        </Box>
      </Flex>
      <DefinitionSource>
        {section2.source}
      </DefinitionSource>
    </div>
  )
}

AboutOrganizationComponent.propTypes = {
  section2: aboutSection2Type.isRequired
}

export default AboutOrganizationComponent
