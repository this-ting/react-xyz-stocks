import React, { useContext } from 'react';
import { Typography, Grid, Container, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import { auth } from '../Firebase.js';

// import components
import LoginContext from '../LoginContext';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px',
    marginBottom: '3em',
    paddingTop: '3rem',
    height: '75vh'
  },
  input: {
    textAlign: 'center'
  },
  infoIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
    height: '15px',
    width: '15px',
    marginLeft: '0.5rem'
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
    <>
      <Container className={classes.root}>
        <Typography
          variant="h5"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Sign in to XYZ Stocks
          <Tooltip title="For the test account: test@test.com / test123">
            <InfoIcon className={classes.infoIcon} />
          </Tooltip>
        </Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Container>
    </>
  );
};

export default Login;
