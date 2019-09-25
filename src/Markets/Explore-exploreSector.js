import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  item: {
    height: '120px',
    border: '1px solid rgba(63, 81, 181, 0.5)',
    margin: '1em',
    textAlign: 'center',
    '&:hover': { color: 'red' }
  }
});

const ExploreSector = props => {
  const classes = useStyles();
  const sectors = [
    'Technology',
    'Healthcare',
    'Consumer Services',
    'Financials',
    'Energy',
    'Basic Materials',
    'Consumer Goods',
    'Financial Services',
    'Industrials',
    'Transportation',
    'Telecommunications',
    'Utilities'
  ];

  const handleClick = e => {
    const input = e.target.textContent.toLowerCase();
    const { getSector } = props;
    getSector(input);
  };

  const category = sectors.map(sect => (
    <Grid
      item
      key={sect}
      xs={4}
      sm={3}
      className={classes.item}
      onClick={handleClick}
    >
      <Typography variant="button" color="primary">
        {sect}
      </Typography>
    </Grid>
  ));

  return (
    <>
      <h3>EXPLORE BY SECTOR</h3>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {category}
      </Grid>
    </>
  );
};

export default ExploreSector;
