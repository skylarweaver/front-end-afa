"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onRenderBody = function (_ref, options) {
  var setPostBodyComponents = _ref.setPostBodyComponents;

  return setPostBodyComponents([_react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement("script", {
      id: "loggly-jslogger",
      key: "gatsby-plugin-loggly",
      src: "https://cloudfront.loggly.com/js/loggly.tracker-latest.min.js"
    }),
    _react2.default.createElement("script", { dangerouslySetInnerHTML: createMarkup() })
  )]);
}; // eslint-disable-next-line no-unused-vars


function createMarkup() {
  return { __html: "\n    var _LTracker = _LTracker || [];\n    _LTracker.push({logglyKey: \"TOKEN\", 'sendConsoleErrors' : true, 'tag' : 'AFA' });\n    " };
}