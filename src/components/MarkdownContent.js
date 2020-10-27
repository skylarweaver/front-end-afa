import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

const converter = new showdown.Converter()

// This is used to convert markdown content in the frontmatter of the .md file into HTML
const MarkdownContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
)

MarkdownContent.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
}


export default MarkdownContent