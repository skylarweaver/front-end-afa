// Overwrites html.js provided by Gatsby by default
import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Dosis:400,700|Playfair+Display:400,900|Vidaloka|Roboto"/>
          <script type="text/json" id="csp-report-uri">
                  {`{"keys": ["blockedURI", "columnNumber", "disposition", "documentURI", "effectiveDirective", "lineNumber", "originalPolicy", "referrer", "sample", "sourceFile", "statusCode", "violatedDirective"], "reportUri" : "https://projectafa.report-uri.com/r/d/csp/enforce"}`}
          </script>
          <script src="https://cdn.report-uri.com/libs/report-uri-js/1.0.1/report-uri-js.min.js" integrity="sha256-Cng8gUe98XCqh5hc8nAM3y5I1iQHBjzOl8X3/iAd4jE= sha384-jlXVxXbM8AXGPwA7gwudc4NU2z7qZsSpsj5eIXnEsBl5SjwyGxFi1BlpE9fTZtJU" crossOrigin="anonymous"></script>
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
