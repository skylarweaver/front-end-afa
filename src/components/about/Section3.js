import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection3Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'

const Seciton3Heading = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const Belief = styled.h3`
	font-size: 28px;
	font-weight: bold;
	letter-spacing: -0.98px;
	line-height: 37px;
`

const BeliefDescription = styled.p`
	font-size: 18px;
	letter-spacing: 0.4px;
	line-height: 24px;
`


const AboutOrganizationComponent = ({ className, section3 }) => {
  console.log('section3: ', section3);

  return (
    <div className={className}>
      <Seciton3Heading>
        {section3.section}
      </Seciton3Heading>
      <Flex>
        <Box width={4 / 12}>
          <Belief>
            {section3.belief1.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief1.description}
          </BeliefDescription>
        </Box>
        <Box width={4 / 12}>
          <Belief>
            {section3.belief2.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief2.description}
          </BeliefDescription>
        </Box>
        <Box width={4 / 12}>
          <Belief>
            {section3.belief3.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief3.description}
          </BeliefDescription>
        </Box>
      </Flex>
    </div>
  )
}

AboutOrganizationComponent.propTypes = {
  section3: aboutSection3Type.isRequired
}

export default AboutOrganizationComponent
