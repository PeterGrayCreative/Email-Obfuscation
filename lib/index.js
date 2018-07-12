class EmailAddress {
  constructor() {
    const emails = document.querySelectorAll('.obfusc');
    this.setup(emails);
  }
  split(email) {
    const newEmail = email.split('').map(char => {
      return char;
    });
    return newEmail;
  }

  setup(emailArray) {
    emailArray.forEach(email => {
      const text = email.innerHTML;
      console.log(email.innerHTML)
      email.innerHTML = this.rot13(email.innerHTML);
      email.addEventListener("mouseover", () => this.unRot13(text));
    })
  }

  unRot13(cipherEmail) {
    const deciphered = [];
    const puncReplaced = cipherEmail
      .replace(/\[(.*?)\]/g, '@')
      .replace(/\_(.*?)\_/g, '.');
    const splitEmail = this.split(puncReplaced);

    for (let i = 0; i <= splitEmail.length - 1; i++) {
      const code = splitEmail[i].charCodeAt(0);
      if (code == '\u200b') {
      } else if ((code >= 65 && code <= 77) || (code >= 97 && code <= 109)) {
        deciphered.push(String.fromCharCode(code + 13));
      } else if ((code >= 78 && code <= 90) || (code >= 110 && code <= 122)) {
        deciphered.push(String.fromCharCode(code - 13));
      } else {
        deciphered.push(String.fromCharCode(code));
      }
    }
    return deciphered.join('');
  }

  rot13(email) {
    const splitEmail = this.split(email);

    const rotString = [];

    for (let i = 0; i <= splitEmail.length - 1; i++) {
      const code = splitEmail[i].charCodeAt(0);
      if (code == '\u200b') {
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
    return rotString.join('');
  }
}

// module.exports = {
//   EmailAddress,
// }
