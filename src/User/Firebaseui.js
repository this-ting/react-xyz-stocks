import React, { Component, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import { auth } from '../Firebase.js';

const SignInScreen = () => {
  const [isSignedIn, setIsSignedIn] = useState('');
  useEffect(() => {
    // Listen to the Firebase Auth state and set the local state.
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      console.log(user);
      setIsSignedIn(!!user);
    });

    // Make sure we un-register Firebase observers when the component unmounts.
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account'
        }
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['email'],
        customParameters: {
          // Forces password re-entry.
          auth_type: 'reauthenticate'
        }
      }
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  if (isSignedIn) {
    return (
      <div>
        <Typography variant="h5" color="textPrimary">
          XYZ Stocks
        </Typography>
        <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => auth.signOut()}>Sign-out</a>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Sign in to XYZ Stocks
      </Typography>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default SignInScreen;
