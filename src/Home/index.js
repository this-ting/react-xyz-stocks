import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Container, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  banner1: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '95vh'
  },
  bannertext1: {
    paddingTop: '10%'
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
    paddingTop: '15%'
  },
  bannerText2: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    textAlign: 'right',
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
    textAlign: 'right',
    margin: 'auto',
    paddingTop: '20%'
  },
  button: {
    marginTop: '2em'
  }
});

function Banner1() {
  const classes = useStyles();
  return (
    <Box className={classes.banner1}>
      <Typography
        variant="h1"
        color="textSecondary"
        align="center"
        className={classes.bannertext1}
      >
        Follow. Learn. Invest.
      </Typography>
    </Box>
  );
}

function Banner2() {
  const classes = useStyles();
  return (
    <Box className={classes.banner2}>
      <Typography
        variant="h1"
        color="textSecondary"
        align="right"
        className={classes.bannertext2}
      >
        Easy like XYZ
      </Typography>
    </Box>
  );
}

function Banner3() {
  const classes = useStyles();
  return (
    <Box className={classes.banner3}>
      <Typography
        variant="h1"
        color="textSecondary"
        align="center"
        className={classes.bannertext2}
      >
        Lets get started!
      </Typography>

      <Button
        color="primary"
        size="large"
        variant="outlined"
        className={classes.button}
      >
        Sign up
      </Button>
    </Box>
  );
}

export default function Home() {
  const classes = useStyles();
  return (
    <Box>
      <Banner1 />
      <Banner2 />
      <Banner3 />
    </Box>
  );
}
