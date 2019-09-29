import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Box, Button, Typography, Paper } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import Search from '../Markets/Search';

const useStyles = makeStyles({
  banner1: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  },
  bannertext1: {
    paddingTop: '47vh'
  },
  banner2: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '97vh'
  },
  bannertext2: {
    paddingTop: '10vh'
  },
  bannerText2: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '20%'
  },
  banner3: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1494185728463-86366f396213?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '97vh',
    textAlign: 'center'
  },
  bannerText3: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    margin: 'auto',
    paddingTop: '25vh'
  },
  button: {
    marginTop: '2em'
  }
});

function Banner1({ getCompany }) {
  const classes = useStyles();

  return (
    <Box className={classes.banner1}>
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.bannertext1}
      >
        Search NASDAQ & NYSE stocks
        <Typography variant="body1" color="textSecondary" align="center">
          Learn about companies you love, easy like ZXY
        </Typography>
      </Typography>
      <br />
      <Paper>
        <Search getCompany={getCompany} />
      </Paper>
    </Box>
  );
}

function Banner2() {
  const classes = useStyles();
  return (
    <Box className={classes.banner2}>
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.bannertext2}
      >
        NASDAQ & NYSE STOCKS
        <Typography variant="body1" color="textSecondary" align="center">
          Learn more about companies you love to help build your perfect
          portfolio.
        </Typography>
      </Typography>
    </Box>
  );
}

function Banner3() {
  const classes = useStyles();
  return (
    <Box className={classes.banner3}>
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.bannertext2}
      >
        Let's get started!
      </Typography>

      <Button
        color="primary"
        size="large"
        variant="outlined"
        className={classes.button}
        to="/explore/"
        component={Link}
      >
        Explore!
      </Button>
    </Box>
  );
}

const Home = ({ getCompany, company }) => {
  if (company !== '') {
    return <Redirect to="/markets/" />;
  }

  return (
    <Box>
      <Banner1 getCompany={getCompany} />
      <Banner2 />
      <Banner3 />
    </Box>
  );
};

export default Home;
