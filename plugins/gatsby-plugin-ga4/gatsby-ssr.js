import React from "react"

// Adds Google Analytics 4 (gtag.js) to the <head> of every page.
// Configure with { measurementId: 'G-XXXXXXXXXX' } in gatsby-config.js.
// When no measurement ID is set (for example in local development), nothing is rendered.
export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const measurementId = pluginOptions && pluginOptions.measurementId
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null

  setHeadComponents([
    <script
      key="gatsby-plugin-ga4-js"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
    />,
    <script
      key="gatsby-plugin-ga4-config"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { anonymize_ip: true });`,
      }}
    />,
  ])
}
