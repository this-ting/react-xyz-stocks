import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    maxWidth: '980px'
  }
});

const ErrorMessage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h5">404 Not Found</Typography>
      <Typography variant="body1">Resource not found :(</Typography>
    </Container>
  );
};

export default ErrorMessage;
