import React from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">Bokmork</header>
    </div>
  );
};

export default withAuthenticator(App, {
  includeGreetings: true,
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
});
