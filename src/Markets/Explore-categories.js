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

const Categories = props => {
  const classes = useStyles();
  const sectors = [
    'Financial',
    'Healthcare',
    'Conglomerates',
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

export default Categories;
