import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const GatsbyLink = props => {
  if (props.to.startsWith('/')) {
    return <Link {...props}>{props.children}</Link>
  }

  return (
    <OutboundLink {...props} href={props.to} className={props.className} target="_blank" rel="noopener noreferrer" >
      {props.children}
    </OutboundLink>
  )
}

GatsbyLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default GatsbyLink 
