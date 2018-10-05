"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _index = _interopRequireDefault(require("./index.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Div100vh', function () {
  it('renders without crashing', function () {
    var div = document.createElement('div');

    _reactDom.default.render(_react.default.createElement(_index.default, null), div);

    _reactDom.default.unmountComponentAtNode(div);
  });
  it('renders without crashing when createRef is not supported', function () {
    _react.default.createRef = null;
    var div = document.createElement('div');

    _reactDom.default.render(_react.default.createElement(_index.default, null), div);

    _reactDom.default.unmountComponentAtNode(div);
  });
});