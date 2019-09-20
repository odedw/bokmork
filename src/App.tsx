import React from 'react';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
import Amplify, { Hub, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

const signUpConfig = { hiddenDefaults: ['phone_number'] };

const LoginPage = () => (
  <Authenticator usernameAttributes="email" signUpConfig={signUpConfig} />
);
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Auth.currentSession()
      .then((data) => setIsLoggedIn(true))
      .catch((err) => console.log('1' + err));
    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log(data);
      if (payload.event === 'signIn') {
        setIsLoggedIn(true);
      } else if (payload.event === 'signOut') {
        setIsLoggedIn(false);
      }
      //   setImmediate(() => dispatch({ type: 'setUser', user: payload.data }));
      //   setImmediate(() =>
      //     window.history.pushState({}, null, 'https://www.amplifyauth.dev/')
      //   );
      //   updateFormState('base');
      // }
    });
  }, []);
  return (
    <div className="App">
      <LoginPage />
      {isLoggedIn ? <header className="App-header">Bokmork</header> : null}
    </div>
  );
};

export default App;
