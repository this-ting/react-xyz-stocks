import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

// import components
import Home from '../Home';
import Markets from '../Markets';
import Disclaimer from '../Disclaimer';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    maxWidth: '980px'
  },
  image: {
    width: '200px',
    height: '200px'
  },
  links: {
    textDecoration: 'none',
    color: 'black'
  },
  item: {
    margin: 'auto'
  }
});

const Footer = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid container item xs={12} sm={6}>
          <Grid item xs={12} sm={12}>
            <img
              src="/logo/logo_transparent.png"
              alt="logo"
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={12} sm={6}>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <Link to="/" component={Home} className={classes.links}>
                Home
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <Link
                to="/markets/"
                component={Markets}
                className={classes.links}
              >
                Explore
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <Link
                to="/terms/"
                component={Disclaimer}
                className={classes.links}
              >
                Terms & Conditions
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
