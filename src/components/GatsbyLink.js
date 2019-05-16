import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

const GatsbyLink = props => {
  if (props.to.startsWith('/') && !props.pdf) {
      return <Link {...props}>{props.children}</Link>
  }

  const {pdf, ...propsWithoutPdf} = props // Remove pdf from props to pass reg props to link
  return (
    <OutboundLink {...propsWithoutPdf} href={props.to} className={props.className} target="_blank" rel="noopener noreferrer" >
      {props.children}
    </OutboundLink>
  )
}

GatsbyLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default GatsbyLink 
