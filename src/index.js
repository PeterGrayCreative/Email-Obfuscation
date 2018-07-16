import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmailAddress extends Component {
  state = {
    cipher: false,
    email: '',
    cipheredEmail: '',
    decipheredEmail: '',
    linkText: '',
    linkType: '',
  };

  componentDidMount() {
    // this.setState({ email: this.props.email });
    const { email } = this.props;
    // caches the original email so rot13 doesn't need to be performed twice
    this.setState({ decipheredEmail: email });
    this.rot13(email);
    this.setLinkType();
  }

  setLinkType = () => {
    const { linkText } = this.props;
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
  };

  unRot13 = () => {
    const { decipheredEmail } = this.state;
    // Sets email to the already-cached deciphered email
    this.setState({ email: decipheredEmail, cipher: false });
  };

  rot13 = email => {

    if (this.state.cipheredEmail !== '') {
      const { cipheredEmail } = this.state;
      this.setState({ email: cipheredEmail, cipher: true });
    } else {

      // Converted to an async function in case of large numbers of components
      const cipherEmail = () => {
        return new Promise((resolve, reject) => {
          const splitEmail = email.split('');
          
          const rotString = splitEmail.map((char) => {
            const code = char.charCodeAt(0);
            if ((code >= 65 && code <= 77) || (code >= 97 && code <= 109)) {
              return String.fromCharCode(code + 13);
            } else if (
              (code >= 78 && code <= 90) ||
              (code >= 110 && code <= 122)
            ) {
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

      cipherEmail().then((email) => {
        // Sets the email state and caches the rot13 result
        this.setState({ email: email, cipheredEmail: email, cipher: true });
      });
    }

  };

  handleCipher = () => {
    return this.state.cipher ? this.unRot13() : this.rot13(this.state.email);
  };

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
  linkText: PropTypes.object,
};

export default EmailAddress;
