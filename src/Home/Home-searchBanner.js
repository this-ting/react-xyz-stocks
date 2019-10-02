import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Box, Typography, Paper } from '@material-ui/core';
import Search from '../Search';

const useStyles = makeStyles({
  banner1: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  },
  bannertext1: {
    paddingTop: '35vh',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem'
    }
  },
  bannerSubtext1: {
    paddingTop: '1rem',
    '@media (max-width: 600px)': {
      fontSize: '1rem'
    }
  },
  search: {
    maxWidth: '980px',
    margin: 'auto',
    width: '100%',
    '@media (max-width: 600px)': {
      width: '90%'
    }
  }
});

const SearchBanner = ({ getCompany }) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner1}>
      <Container>
        <Typography
          gutterBottom
          variant="h2"
          color="textSecondary"
          align="center"
          className={classes.bannertext1}
        >
          Search NASDAQ & NYSE Stocks
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            align="center"
            className={classes.bannerSubtext1}
          >
            Learn about companies you love, easy like XYZ
          </Typography>
        </Typography>
        <br />
        <Paper className={classes.search}>
          <Container>
            <Search getCompany={getCompany} />
          </Container>
        </Paper>
      </Container>
    </Box>
  );
};

export default SearchBanner;
