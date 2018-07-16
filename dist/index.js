'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailAddress = function (_Component) {
  _inherits(EmailAddress, _Component);

  function EmailAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmailAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmailAddress.__proto__ || Object.getPrototypeOf(EmailAddress)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      cipher: false,
      email: '',
      cipheredEmail: '',
      decipheredEmail: '',
      linkText: '',
      linkType: ''
    }, _this.setLinkType = function () {
      var linkText = _this.props.linkText;

      var type = void 0;
      var link = void 0;
      if (linkText) {
        if (linkText.hasOwnProperty('email')) {
          type = 'email';
          link = _this.state.email;
        } else if (linkText.hasOwnProperty('text')) {
          type = 'text';
          link = linkText.text;
        }
      } else {
        type = 'default';
        link = 'Email Now';
      }
      _this.setState({ linkText: link, linkType: type });
    }, _this.unRot13 = function () {
      var decipheredEmail = _this.state.decipheredEmail;
      // Sets email to the already-cached deciphered email

      _this.setState({ email: decipheredEmail, cipher: false });
    }, _this.rot13 = function (email) {

      if (_this.state.cipheredEmail !== '') {
        var cipheredEmail = _this.state.cipheredEmail;

        _this.setState({ email: cipheredEmail, cipher: true });
      } else {

        // Converted to an async function in case of large numbers of components
        var cipherEmail = function cipherEmail() {
          return new Promise(function (resolve, reject) {
            var splitEmail = email.split('');

            var rotString = splitEmail.map(function (char) {
              var code = char.charCodeAt(0);
              if (code >= 65 && code <= 77 || code >= 97 && code <= 109) {
                return String.fromCharCode(code + 13);
              } else if (code >= 78 && code <= 90 || code >= 110 && code <= 122) {
                return String.fromCharCode(code - 13);
              } else if (code === 64) {
                return '[at]';
              } else if (code === 46) {
                return '_dot_';
              } else {
                return char;
              }
            }).join('');
            resolve(rotString);
          });
        };

        cipherEmail().then(function (email) {
          // Sets the email state and caches the rot13 result
          _this.setState({ email: email, cipheredEmail: email, cipher: true });
        });
      }
    }, _this.handleCipher = function () {
      return _this.state.cipher ? _this.unRot13() : _this.rot13(_this.state.email);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EmailAddress, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.setState({ email: this.props.email });
      var email = this.props.email;
      // caches the original email so rot13 doesn't need to be performed twice

      this.setState({ decipheredEmail: email });
      this.rot13(email);
      this.setLinkType();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { style: { width: '100%' }, href: 'mailto:' + this.state.email },
          _react2.default.createElement(
            'div',
            {
              onMouseEnter: this.handleCipher,
              onMouseLeave: this.handleCipher
            },
            (this.state.linkType === 'text' || this.state.linkType === 'default') && this.state.linkText,
            this.state.linkType === 'email' && this.state.email
          )
        )
      );
    }
  }]);

  return EmailAddress;
}(_react.Component);

EmailAddress.propTypes = {
  email: _propTypes2.default.string,
  linkText: _propTypes2.default.object
};

exports.default = EmailAddress;