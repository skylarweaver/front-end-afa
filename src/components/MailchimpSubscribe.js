import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

const MailchimpContainer = styled(Box)`
`

const SubscribeButton = styled.button`
  // padding: 10px 60px;
  // margin: 0 16px;
  height: 40px;
  min-width: 175px;
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.tertiaryLight};
  border: none; // solid 2px ${props => props.theme.secondary};
  box-sizing: border-box;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    min-width: initial;
  }
`

const SubscribeInput = styled.input`
  margin-bottom: 0px;
  height: 40px;
  width: 250px;
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: initial;
  }
`

// Created here: https://us20.admin.mailchimp.com/lists/integration/embeddedcode?source=blueprint_form_option_EmbeddedForm&create_location=deep+link&time_to_create=6&id=56427

const MailchimpSubscribe = ({ className }) => (
  <MailchimpContainer id="mc_embed_signup" className={className} mt={3}>
    <form action="https://gmail.us20.list-manage.com/subscribe/post?u=546c93181e6c31f6acd023a26&amp;id=52dfb79458" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" rel="noopener noreferrer" noValidate>
      <Flex id="mc_embed_signup_scroll" alignItems='center'>
        <div className="mc-field-group" >
          {/* <label htmlFor="mce-EMAIL">Email Address </label> */}
          <SubscribeInput type="email" defaultValue="" placeholder="Email Address" autoComplete="email" name="EMAIL" className="required email" id="mce-EMAIL" >
          </SubscribeInput>
        </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }}>
          </div>
          <div className="response" id="mce-success-response" style={{ display: 'none' }}>
          </div>
        </div>
        {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
        <div style={{ position: 'absolute', width: 0 + 'px', hidden: 0 + 'px', overflow: 'hidden'}} aria-hidden="true">
          <input type="text" name="b_546c93181e6c31f6acd023a26_52dfb79458" tabIndex="-1" defaultValue="">
          </input>
        </div>
        <Box className="clear" >
          <SubscribeButton type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button">
            Subscribe for Updates
          </SubscribeButton>
        </Box>
      </Flex>
    </form>
  </MailchimpContainer >
)

MailchimpSubscribe.propTypes = {
}

export default MailchimpSubscribe
