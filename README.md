# React Email Bot Buster

If you've ever wanted to make your email available in a React project, but don't want to get spammed then this is the module for you.
I built this customizable email obfuscation component to solve that problem using Rot13.

Here's an example of the obfuscation:

It takes an email:

`info@email.com`

and turns it into this:

`vasb[at]rznvy_dot_pbz`

Using **Rot13** in addition to replacing important characters that a bot will use to pattern match your email address should be nearly invisible to most scrape bots.

**The Email address is unobfuscated on hover in both the mailto and link if you choose to use the email.**

### Prerequisites

This module is written for React.

### Installing

Install this component using your preferred package manager:

```
npm i react-bot-buster-email-obfuscation

or

yarn add react-bot-buster-email-obfuscation
```

Import it just like any other module:

```javascript
import EmailAddress from 'react-bot-buster-email-obfuscation';
```

### How to Use

A simple example of component use:

```javascript
import React from 'react';
import { render } from 'react-dom';
import EmailAddress from 'react-bot-buster-email-obfuscation';
const App = () => {
  return <EmailAddress email='info@email.com' linkText={{ email: 'info@email.com' }} />;
};
render(<App />, document.getElementById('root'));
```

Use map to loop over multiple email addresses and obfuscate them:

```javascript
render() {
  <div>
    {emails.map((email) => {
      return (
        <EmailAddress key={email} email={email} linkText={{ text: 'Email' }} />
      );
    })}
<div>
};
```

### Configure

This does come with a few options:

You can pass in your own custom link text through the linkText prop.

```javascript
<EmailAddress email={email} linkText={{ text: 'Email' }} />
```

Or you can pass in the email.
The linkText needs to contain the email key in order to use it as the link text.

```javascript
<EmailAddress email={email} linkText={{ email: 'info@mail.com' }} />
```
  or shorthand:
```javascript
<EmailAddress email={email} linkText={{ email }} />
```

If you don't want to pass in anything it will use the default text which is **'Email Now'**.

## Built With

- [Webpack](https://webpack.js.org/) - Example built with Webpack
- [Babel](https://babeljs.io/) - Used to transpile the component

## Contributing

Feel free to submit a pull request on [Github](https://github.com/PeterGrayCreative/Email-Obfuscation). Contributions are always welcome.

## Authors

- **Peter Gray** - [Find me on Github](https://github.com/PeterGrayCreative)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
