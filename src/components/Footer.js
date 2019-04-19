import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const WhyTitle = styled.h2`
	font-size: 38px;
	font-weight: bold;
	letter-spacing: -1.33px;
	line-height: 50px;
`

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={className}>
      <Flex>
        <Box width={4 / 12}>
          <Flex flexDirection={'column'}>
            &copy; {currentYear} Adventures for Alopecia
            <Link to={'/privacyPolicy_EN'}>Privacy Policy</Link>
          </Flex>
        </Box>
        <Box width={4 / 12}>
          <Flex flexDirection={'column'}>
            Get in touch!
          <a href="mailto:info@projectAFA.org?subject=Adventures for Alopecia Inquiry" target="_blank">info@projectAFA.org</a>
          </Flex>
        </Box>
        <Box width={4 / 12}>
          Follow us! <br></br>
          <Flex>
            <Box >
              <a href="https://www.instagram.com/sky_earth_water/" target="_blank">Instagram</a>
            </Box>
            <Box >
              <a href="https://www.instagram.com/sky_earth_water/" target="_blank">Facebook</a>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer 
