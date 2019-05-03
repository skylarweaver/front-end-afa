import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const FooterTitle = styled.h4`
  color: ${props => props.theme.tertiaryLight};
  margin: 0 0 10px 0;
`

const FooterText = styled.p`
  color: ${props => props.theme.white};
  margin: 0 0 10px 0;
`

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box px={6} pt={4} pb={3} className={className}>
      <Flex css={{ height: '100%' }}>
        <Box width={4 / 12} pr={4}>
          <Flex flexDirection='column'>
            <FooterTitle>Get in touch!</FooterTitle>
            <FooterText>
              Know someone with Alopecia in Central or South America? Have a connection along Skylar's route?
              Have a random question? Just want to chat? Send us a message!
              <br></br>
              <a href="mailto:info@projectAFA.org?subject=Adventures for Alopecia Inquiry" target="_blank">info@projectAFA.org</a>
            </FooterText>
          </Flex>
        </Box>
        <Box width={4 / 12} alignSelf='flex-end'>
          <Flex justifyContent='center'>
            <FooterText>&copy; {currentYear} Adventures for Alopecia &#9; <Link to={'/privacyPolicy_EN'}>Privacy Policy</Link></FooterText>
          </Flex>
        </Box>
        <Box width={4 / 12} pl={6} css={{ textAlign: 'right' }}>
          <FooterTitle>Follow us!</FooterTitle>
          <FooterText>Join us on Insta and Facebook to track the journey and witness the impact.</FooterText>
          <Flex justifyContent='flex-end'>
            <Box >
              <a href="https://www.instagram.com/sky_earth_water/" target="_blank">Instagram</a>
            </Box>
            <Box >
              <a href="https://www.instagram.com/sky_earth_water/" target="_blank">Facebook</a>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

Footer.propTypes = {
}

export default Footer 
