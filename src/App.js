import React, { useState, useEffect } from 'react';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import { awsExports } from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
});

function AuthenticatedApp() {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    fetchJwtToken();
  }, []);

  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
    } catch (error) {
      console.log('Error fetching JWT token:', error);
    }
  };

  return (
    <div>
      <button onClick={() => Auth.signOut()}>Sign out</button>
      <h4>Your JWT token:</h4>
      <textarea readOnly value={jwtToken} style={{ width: '100%', minHeight: '100px' }}></textarea>
    </div>
  );
}

function App() {
  return (
    <Authenticator 
      initialState='signIn'
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <Authenticator.SignUp.FormFields />
                <div><label>First name</label></div>
                <input
                  type="text"
                  name="given_name"
                  placeholder="Please enter your first name"
                />
                <div><label>Last name</label></div>
                <input
                  type="text"
                  name="family_name"
                  placeholder="Please enter your last name"
                />
                <div><label>Email</label></div>
                <input
                  type="text"
                  name="email"
                  placeholder="Please enter a valid email"
                />
              </>
            );
          },
        },
      }}
      services={{
        async validateCustomSignUp(formData) {
          if (!formData.given_name) {
            return {
              given_name: 'First Name is required',
            };
          }
          if (!formData.family_name) {
            return {
              family_name: 'Last Name is required',
            };
          }
          if (!formData.email) {
            return {
              email: 'Email is required',
            };
          }
        },
      }}
    >
      <AuthenticatedApp />
    </Authenticator>
  );
}

export default App;
