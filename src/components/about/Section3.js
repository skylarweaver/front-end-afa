import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection3Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'
import CtaButton from '../CtaButton'
import ContentLayout from '../ContentLayout'

const Seciton3Heading = styled.h2`
  color: ${props => props.theme.white};
`

const Belief = styled.h4`
  color: ${props => props.theme.white};
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    margin-bottom: 0px;
  }
`

const BeliefDescription = styled.p`
  color: ${props => props.theme.white};
`


const AboutOrganizationComponent = ({ className, section3 }) => {
  console.log('section3: ', section3);

  return (
    <ContentLayout className={className}>
      <Seciton3Heading>
        {section3.section}
      </Seciton3Heading>
      <Flex flexWrap={['wrap','wrap','initial']}>
        <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
          <Belief>
            {section3.belief1.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief1.description}
          </BeliefDescription>
        </Box>
        <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
          <Belief>
            {section3.belief2.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief2.description}
          </BeliefDescription>
        </Box>
        <Box width={[1, 1, 4 / 12]} mx={[0, 1, 4]} px={[1, 1, 3]}>
          <Belief>
            {section3.belief3.heading}
          </Belief>
          <BeliefDescription>
            {section3.belief3.description}
          </BeliefDescription>
        </Box>
      </Flex>
    </ContentLayout>
  )
}

AboutOrganizationComponent.propTypes = {
  section3: aboutSection3Type.isRequired
}

export default AboutOrganizationComponent
