// eslint-disable-next-line no-unused-vars
import React from "react";

exports.onRenderBody = ({ setPostBodyComponents }, options) => {
  return setPostBodyComponents([
    <React.Fragment>
    <script
      id="loggly-jslogger"
      key="gatsby-plugin-loggly"
      src="https://cloudfront.loggly.com/js/loggly.tracker-latest.min.js"
    />
    <script dangerouslySetInnerHTML={createMarkup()}/>
    </React.Fragment>
  ]);
};

function createMarkup() {
  return {__html: `
    var _LTracker = _LTracker || [];
    _LTracker.push({logglyKey: "14b608a9-db9f-4ba4-8e19-56d4629722af", 'sendConsoleErrors' : false, 'tag' : 'AFA' });
    `};
}