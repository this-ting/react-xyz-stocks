import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

// import components
import Home from '../Home';
import Markets from '../Markets';
import Disclaimer from '../Disclaimer';
import Portfolio from '../User/portfolio';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    maxWidth: '980px',
    position: 'sticky'
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
    <Container className={classes.root} component="footer">
      <Grid container justify="space-between" alignItems="center">
        <Grid container item xs={12} sm={6}>
          <Grid item xs={12} sm={12}>
            <NavLink to="/" component={Home}>
              <img
                src="/logo/logo_transparent_horizontal.png"
                alt="logo"
                className={classes.image}
              />
            </NavLink>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={12} sm={6}>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink to="/" component={Home} className={classes.links}>
                Home
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink
                to="/markets/"
                component={Markets}
                className={classes.links}
              >
                Explore
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink
                to="/portfolio/"
                component={Portfolio}
                className={classes.links}
              >
                Portfolio
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink
                to="/terms/"
                component={Disclaimer}
                className={classes.links}
              >
                Terms & Conditions
              </NavLink>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
