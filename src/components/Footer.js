import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'
import MailchimpSubscribe from './MailchimpSubscribe'
import Link from './GatsbyLink'

const FooterTitle = styled.h4`
  color: ${props => props.theme.tertiaryLight};
  margin: 0 0 10px 0;
`

const FooterText = styled.p`
  color: ${props => props.theme.white};
  margin: 0 0 10px 0;
`

const FooterCopyrightText = styled.p`
  font-size: 14px;
  color: ${props => props.theme.white};
  margin: 0 0 10px 0;
`

const FollowUsFooter = styled(Box)`
  text-align: right;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    text-align: left;
  }
`

const MediaIcons = styled(Flex)`
  justify-content: flex-end;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    justify-content: initial;
  }
`

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={className}>
      <Flex px={[3, 3, 6]} pt={[3, 4, 4]} pb={3} flexWrap='wrap' css={{ height: '100%' }}>
        <Box width={[1, 1, 6 / 12]} pr={[0,0,4]}>
          <Flex flexDirection='column'>
            <FooterTitle>Get in touch!</FooterTitle>
            <FooterText>
              Know someone with Alopecia living in Central or South America? Have a connection along Skylar's route?
              Have a random question? Just want to chat? Send us a message!
            <br></br>
              <Link to="mailto:info@projectAFA.org?subject=Adventures for Alopecia Inquiry">info@projectAFA.org</Link>
            </FooterText>
          </Flex>
        </Box>
        <FollowUsFooter width={[1, 1, 6 / 12]} mt={[2,2,0]} pl={[0, 0, 6]}>
          <FooterTitle>Follow us!</FooterTitle>
          <FooterText>Join us on Insta and Facebook to track the journey and witness the impact.</FooterText>
          {/* <MailchimpSubscribe /> */}
          <MediaIcons>
            <Box >
              <Link to="https://www.instagram.com/sky_earth_water/">Instagram</Link>
            </Box>
            <Box >
              <Link to="https://www.instagram.com/sky_earth_water/">Facebook</Link>
            </Box>
          </MediaIcons>
        </FollowUsFooter>
      </Flex>
      <Flex flexDirection='column' justifyContent='center' alignItems='center'  mt={[2,2,0]}>
        <FooterCopyrightText>Website designed by the amazing <Link to='https://www.linkedin.com/in/zmohtadi/'>Z Mohtadi</Link> and the incredible <Link to='https://www.linkedin.com/in/bstrahm/'>Brendan Strahm.</Link></FooterCopyrightText>
        <FooterCopyrightText>&copy; {currentYear} Adventures for Alopecia &#9; <Link to={'/privacyPolicy_EN'}>Privacy Policy</Link></FooterCopyrightText>
      </Flex>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer 
