import React from 'react';
import { Container, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { auth } from '../Firebase.js';

const useStyles = makeStyles({
  root: {
    maxWidth: '980px',
    marginTop: '11rem',
    marginBottom: '2em'
  }
});

const Settings = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h4">Settings</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => auth.signOut()}
      >
        Log Out
      </Button>
      <Paper>
        <Typography variant="h6">Profile</Typography>
      </Paper>
    </Container>
  );
};

export default Settings;
