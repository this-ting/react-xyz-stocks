import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import { auth } from '../Firebase.js';

class SignInScreen extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user =>
      this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <Typography variant="h5" color="textPrimary">
            Sign in to XYZ Stocks
          </Typography>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
        </div>
      );
    }
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
}

export default SignInScreen;
