import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  item: {
    flexGrow: 1,
    maxWidth: 'none',
    height: '190px',
    border: '1px solid rgba(63, 81, 181, 0.5)',
    margin: '1em',
    textAlign: 'center',
    borderRadius: '12px',
    opacity: 1,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 1px 5px 0px #b4bbe0'
    },
    '&:hover h6': {
      textTransform: 'lowercase',
      maxInlineSize: 'fit-content',
      fontSize: '1.6rem'
    },
    '&:hover p': {
      display: 'inline-block'
    },
    '&:active': {
      transform: 'scale(1.05)',
      boxShadow: '0px 1px 5px 0px #b4bbe0'
    },
    '&:active h6': {
      textTransform: 'lowercase',
      maxInlineSize: 'fit-content',
      fontSize: '1.6rem'
    },
    '&:active p': {
      display: 'inline-block'
    }
  },
  header: {
    fontSize: '1.1rem'
  },
  text: {
    display: 'none',
    textAlign: 'left'
  }
});

const ExploreSector = props => {
  const classes = useStyles();
  const sectors = [
    {
      name: 'Technology',
      desc: 'U.S. electronics, computer software and hardware, & IT companies'
    },
    {
      name: 'Healthcare',
      desc:
        'U.S. healthcare equipment and services, pharmaceuticals, & biotech companies'
    },
    {
      name: 'Consumer Services',
      desc:
        'U.S. companies that distribute food, drugs, general retail items, & media'
    },
    {
      name: 'Financials',
      desc: 'U.S. banks, insurers, & credit card companies'
    },
    {
      name: 'Energy',
      desc: 'U.S. companies that produce and distribute oil & gas'
    },
    {
      name: 'Basic Materials',
      desc:
        'U.S. companies involved with the production of raw materials (eg. metals, chemicals & forestry products, etc)'
    },
    {
      name: 'Consumer Goods',
      desc:
        'U.S. companies that produce consumer goods (eg. food, automobiles, & household goods, etc)'
    },
    {
      name: 'Financial Services',
      desc:
        'U.S. investment / commercial banks, asset managers, & securities exchanges'
    },
    {
      name: 'Industrials',
      desc:
        'U.S. companies that produce goods used in construction & manufacturing'
    },
    {
      name: 'Transportation',
      desc: 'U.S. airline, railroad, & trucking companies'
    },
    {
      name: 'Telecommunications',
      desc:
        'U.S. companies that provide telephone and internet products, services, & technologies'
    },
    {
      name: 'Utilities',
      desc: 'U.S. companies that supply electricity, gas, & water'
    }
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
      xs={12}
      sm={3}
      className={classes.item}
      onClick={handleClick}
    >
      <Typography
        variant="button"
        color="primary"
        component="h6"
        className={classes.header}
      >
        {sect.name}
      </Typography>
      <Typography
        variant="body2"
        color="textsecondary"
        className={classes.text}
      >
        {sect.desc}
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
