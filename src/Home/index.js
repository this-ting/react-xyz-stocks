import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

// import components
import SearchBanner from './SearchBanner';
import StockBanner from './StockBanner';
import NewsBanner from './NewsBanner';

const useStyles = makeStyles({
  banner2: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  },
  bannerText2: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '10vh'
  }
});

const Banner2 = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.banner2}>
        <Typography
          variant="h2"
          color="textSecondary"
          align="center"
          className={classes.bannerText2}
        >
          NASDAQ & NYSE STOCKS
          <Typography variant="body1" color="textSecondary" align="center">
            Learn more about companies you love to help build your perfect
            portfolio.
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

const Home = ({ getCompany, company }) => {
  if (company !== '') {
    return (
      <Redirect
        push
        to={{
          pathname: '/stock',
          search: `?utm=${company}`
        }}
      />
    );
  }

  return (
    <Box>
      <SearchBanner getCompany={getCompany} />
      <StockBanner getCompany={getCompany} />
      {/* <Banner3 /> */}
      <NewsBanner />
    </Box>
  );
};

export default Home;
