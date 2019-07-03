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
                  {{"keys": ["blockedURI", "columnNumber", "disposition", "documentURI", "effectiveDirective", "lineNumber", "originalPolicy", "referrer", "sample", "sourceFile", "statusCode", "violatedDirective"], "reportUri" : "https://projectafa.report-uri.com/r/d/csp/enforce"}}
          </script>
          <script src="https://cdn.report-uri.com/libs/report-uri-js/1.0.1/report-uri-js.min.js" integrity="sha256-EK9NI8X6u5r94Y27JDrWA5+HXlouWbw99xQDNIuyVqs= sha384-HMdm31S00EFk196Nn4CqWIX62hcHuO7O6DRbl78jLXaulY35/8LuPeekSgqk40tl sha512-7pIteAOiWkYuoaM2VNcO5l5h705cfgzfwasLnfNvx5ttYYYcd/93+FSiVJIPOUZq62bAAW7jVpNfaf1w7kOYjg==" crossOrigin="anonymous"></script>
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
