import React from 'react';
import { render } from 'react-dom';
import EmailAddress from '../../dist';
const App = () => {
  const email = 'info@email.com';
  return <EmailAddress email={email} linkText={{ email }} />;
};
render(<App />, document.getElementById('root'));
