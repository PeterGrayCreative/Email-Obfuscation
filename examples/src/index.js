import React from 'react';
import { render} from 'react-dom';
import EmailAddress from '../../src';
const App = () => (
  <EmailAddress email="info@email.com" linkText={{ text: 'Email' }} />
);
render(<App />, document.getElementById("root"));