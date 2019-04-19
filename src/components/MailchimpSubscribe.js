import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex, Box } from '@rebass/grid'

// Created here: https://us20.admin.mailchimp.com/lists/integration/embeddedcode?source=blueprint_form_option_EmbeddedForm&create_location=deep+link&time_to_create=6&id=56427

const MailchimpSubscribe = ({ }) => (
  <div id="mc_embed_signup" >
    <form action="https://gmail.us20.list-manage.com/subscribe/post?u=546c93181e6c31f6acd023a26&amp;id=52dfb79458" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
      <Flex id="mc_embed_signup_scroll">
        <div className="mc-field-group">
          {/* <label htmlFor="mce-EMAIL">Email Address </label> */}
          <input type="email" defaultValue="" placeholder="Email Address" name="EMAIL" className="required email" id="mce-EMAIL" >
          </input>
        </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{ display: 'none' }}>
          </div>
          <div className="response" id="mce-success-response" style={{ display: 'none' }}>
          </div>
        </div>
        {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
        <div style={{ position: 'absolute', left: -5000 + 'px' }} aria-hidden="true">
          <input type="text" name="b_546c93181e6c31f6acd023a26_52dfb79458" tabIndex="-1" defaultValue="">
          </input>
        </div>
        <Box className="clear">
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button">
          </input>
        </Box>
      </Flex>
    </form>
  </div >
)

MailchimpSubscribe.propTypes = {
}

export default MailchimpSubscribe
