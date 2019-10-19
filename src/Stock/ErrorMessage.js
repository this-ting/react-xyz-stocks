import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '980px',
    height: '50vh',
    marginTop: '11rem'
  },
  header: {
    fontWeight: 'bolder'
  }
});

const ErrorMessage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h3" gutterBottom className={classes.header}>
        404 Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Uh oh... Resource not found :(
      </Typography>
    </Container>
  );
};

export default ErrorMessage;
