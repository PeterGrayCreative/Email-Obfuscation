import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailAddress extends Component {
  state = {
    cipher: true,
    email: '',
    linkText: '',
    linkType: '',
  };

  componentDidMount() {
    // this.setState({ email: this.props.email });
    const { email } = this.props;
    this.rot13(email);
    this.setLinkType();
  }

  setLinkType = () => {
    const { linkText } = this.props;
    console.log(this.props);
    let type;
    let link;
    if (linkText) {
      if (linkText.hasOwnProperty('email')) {
        type = 'email';
        link = this.state.email;
      } else if (linkText.hasOwnProperty('text')) {
        type = 'text';
        link = linkText.text;
      }
    } else {
      type = 'default';
      link = 'Email Now';
    }
    this.setState({ linkText: link, linkType: type });
  }

  splitEmail = (email) => {
    return email.split('');
  }

  unRot13 = (email) => {
    const deciphered = [];
    const puncReplaced = email
      .replace(/\[(.*?)\]/g, '@')
      .replace(/_(.*?)_/g, '.');
    const splitEmail = this.splitEmail(puncReplaced);

    for (let i = 0; i <= splitEmail.length - 1; i++) {
      const code = splitEmail[i].charCodeAt(0);
      if (code === '\u200b') {
      } else if ((code >= 65 && code <= 77) || (code >= 97 && code <= 109)) {
        deciphered.push(String.fromCharCode(code + 13));
      } else if ((code >= 78 && code <= 90) || (code >= 110 && code <= 122)) {
        deciphered.push(String.fromCharCode(code - 13));
      } else {
        deciphered.push(String.fromCharCode(code));
      }
    }
    const joinEmail = deciphered.join('');
    this.setState({ email: joinEmail, cipher: false });
  }

  rot13 = (email) => {
    const splitEmail = this.splitEmail(email);

    const rotString = [];

    for (let i = 0; i <= splitEmail.length - 1; i++) {
      const code = splitEmail[i].charCodeAt(0);
      if (code === '\u200b') {
      } else if ((code >= 65 && code <= 77) || (code >= 97 && code <= 109)) {
        rotString.push(String.fromCharCode(code + 13));
      } else if ((code >= 78 && code <= 90) || (code >= 110 && code <= 122)) {
        rotString.push(String.fromCharCode(code - 13));
      } else if (code === 64) {
        rotString.push('[at]');
      } else if (code === 46) {
        rotString.push('_dot_');
      } else {
        rotString.push(String.fromCharCode(code));
      }
    }
    const joinEmail = rotString.join('');
    this.setState({ email: joinEmail, cipher: true });
  }

  handleCipher = () => {
    return this.state.cipher
      ? this.unRot13(this.state.email)
      : this.rot13(this.state.email);
  }

  render() {
    return (
      <div>
        <a style={{ width: '100%' }} href={`mailto:${this.state.email}`}>
          <div
            onMouseEnter={this.handleCipher}
            onMouseLeave={this.handleCipher}
          >
            {(this.state.linkType === 'text' ||
              this.state.linkType === 'default') &&
              this.state.linkText}
            {this.state.linkType === 'email' && this.state.email}
          </div>
        </a>
      </div>
    );
  }
}

EmailAddress.propTypes = {
  email: PropTypes.string,
  linkText: PropTypes.string,
};

export default EmailAddress;
