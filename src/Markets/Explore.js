import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  item: {
    height: '120px',
    border: '1px solid rgba(63, 81, 181, 0.5)',
    margin: '1em',
    textAlign: 'center',
    '&:hover': { color: 'red' }
  },
  container: {
    marginBottom: '3em'
  }
});

function Explore() {
  const classes = useStyles();
  const industry = [
    'Basic Industries',
    'Capital Goods',
    'Consumer Durables',
    'Consumer Non-Dur',
    'Consumer Services',
    'Energy',
    'Finance',
    'Healthcare',
    'Miscellaneous',
    'Public Utilities',
    'Technology',
    'Transportation'
  ];

  const category = industry.map(ind => (
    <Grid item xs={4} sm={3} className={classes.item}>
      <Typography variant="button" color="primary">
        {ind}
      </Typography>
    </Grid>
  ));

  const catContainer = (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      {category}
    </Grid>
  );

  return (
    <Container>
      <h3>EXPLORE</h3>
      {catContainer}
    </Container>
  );
}

export default Explore;
