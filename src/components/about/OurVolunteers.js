import React from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { aboutOurVolunteersType } from '../../proptypes/about-proptypes'
import ContentLayout from '../ContentLayout'
import { Flex, Box } from '@rebass/grid'

const Section4Heading = styled.h2`
`

const StyledHeadshot = styled(Image)`
  max-width: 100px;
  margin: auto;
  margin-bottom: 10px;
`

const VolunteerName = styled.h4`
  text-align: center;
  margin: 0px;
  font-weight: 400;
`

const VolunteerRole = styled.h5`
  color: ${props => props.theme.primary};
  font-size: 16px;
  text-align: center;
  margin: 10px;
`

const Volunteer = ({ data, volunteer }) => (
  <Box width={[1/2, 1/2, 3 / 12]} mx={[0, 0, 0]} px={[1, 0, 0]} mt={[5, 5, 0]}>
    <StyledHeadshot
      fluid={volunteer.image.childImageSharp.fluid}
      alt={volunteer.name}
    />
    <VolunteerName>
      {volunteer.name}
    </VolunteerName>
    <VolunteerRole>
      {volunteer.role}
    </VolunteerRole>
  </Box>
)

const AboutOrganizationComponent = ({ className, ourVolunteers }) => {
  console.log('ourVolunteers: ', ourVolunteers);
  return (
    <ContentLayout className={className}>
      <Section4Heading>
        {ourVolunteers.section}
      </Section4Heading>
      <Flex flexWrap={['wrap', 'wrap', 'wrap']} justifyContent='space-evenly' mt={[0, 0, 3]}>
        {ourVolunteers.volunteers.map((volunteer, index) => (
          <Volunteer volunteer={volunteer} key={index} />
        ))}
      </Flex>
    </ContentLayout>
  )
}

AboutOrganizationComponent.propTypes = {
  ourVolunteers: aboutOurVolunteersType.isRequired
}

export default AboutOrganizationComponent
