import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

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

const Categories = props => {
  const classes = useStyles();
  const sectors = [
    'Financial',
    'Healthcare',
    'Congloermates',
    'Consumer Goods',
    'Services',
    'Utilities',
    'Basic Materials',
    'Technology',
    'Industrial Goods'
  ];

  const handleClick = e => {
    const input = e.target.textContent.toLowerCase();
    const { getSector } = props;
    getSector(input);
  };

  const category = sectors.map(sect => (
    <Grid item xs={4} sm={3} className={classes.item} onClick={handleClick}>
      <Typography variant="button" color="primary">
        {sect}
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
    <>
      <h3>SECTORS</h3>
      {catContainer}
    </>
  );
};

export default Categories;
