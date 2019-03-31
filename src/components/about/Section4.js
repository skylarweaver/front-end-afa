import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutSection4Type } from '../../proptypes/about-proptypes'
import { Flex, Box } from '@rebass/grid'

const Seciton4Heading = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const DirectorName = styled.h3`
	font-size: 28px;
	font-weight: bold;
	letter-spacing: -0.98px;
  line-height: 37px;
  text-align: center;
`

const DirectorDescription = styled.p`
	font-size: 16px;
	line-height: 24px;
`

const DirectorRole = styled.p`
font-size: 16px;
line-height: 24px;
text-align: center;
`


const AboutOrganizationComponent = ({ className, section4 }) => {
  console.log('section4: ', section4);

  return (
    <div className={className}>
      <Seciton4Heading>
        {section4.section}
      </Seciton4Heading>
      <Flex>
        <Box width={6 / 12}>
          <DirectorName>
            {section4.director1.name}
          </DirectorName>
          <DirectorRole>
            Executive Director
          </DirectorRole>
          <DirectorDescription>
            {section4.director1.description}
          </DirectorDescription>
        </Box>
        <Box width={6 / 12}>
          <DirectorName>
            {section4.director2.name}
          </DirectorName>
          <DirectorRole>
            Executive Director
          </DirectorRole>
          <DirectorDescription>
            {section4.director2.description}
          </DirectorDescription>
        </Box>
      </Flex>
      <Flex>
        <Box width={4 / 12}>
          <DirectorName>
            {section4.director3.name}
          </DirectorName>
          <DirectorRole>
            Executive Director
          </DirectorRole>
        </Box>
        <Box width={4 / 12}>
          <DirectorName>
            {section4.director4.name}
          </DirectorName>
          <DirectorRole>
            Executive Director
          </DirectorRole>
        </Box>
        <Box width={4 / 12}>
          <DirectorName>
            {section4.director5.name}
          </DirectorName>
          <DirectorRole>
            Executive Director
          </DirectorRole>
        </Box>
      </Flex>
    </div>
  )
}

AboutOrganizationComponent.propTypes = {
  section4: aboutSection4Type.isRequired
}

export default AboutOrganizationComponent
