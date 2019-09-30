import React, { Component, useState, useEffect, useContext } from 'react';
import { Typography, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import { auth } from '../Firebase.js';

import LoginContext from '../LoginContext';

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1501471463901-742b06720960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '50%',
    height: '100vh'
  },
  input: {
    textAlign: 'center'
  },
  root: {
    backgroundColor: '#031628',
    opacity: '0.3',
    height: '100vh',
    width: '100vw'
  }
});

const Login = () => {
  const classes = useStyles();
  const uid = useContext(LoginContext);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
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

  if (uid) {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.background} xs={7} />
        <Grid item xs={5} className={classes.input}>
          <Typography variant="h5" color="textPrimary">
            XYZ Stocks
          </Typography>
          <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
          <a onClick={() => auth.signOut()}>Sign-out</a>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.background} xs={7} />
      <Grid item xs={5} className={classes.input}>
        <Typography variant="h5" color="textPrimary">
          Sign in to XYZ Stocks
        </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Grid>
    </Grid>
  );
};

export default Login;
