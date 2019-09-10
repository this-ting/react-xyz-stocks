import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import SignInScreen from './Firebaseui.js';

const useStyles = makeStyles({
  background: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1501471463901-742b06720960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '50%',
    height: '93vh'
  },
  input: {
    textAlign: 'center'
  }
});

export default function Login() {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.background} xs="7" />
      <Grid item xs="5" className={classes.input}>
        <SignInScreen />
      </Grid>
    </Grid>
  );
}
