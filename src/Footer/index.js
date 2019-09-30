import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

// import components
import Home from '../Home';
import Explore from '../Explore';
import Disclaimer from '../Disclaimer';
import Portfolio from '../User/portfolio';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    maxWidth: '2000px',
    position: 'sticky',
    backgroundColor: '#dad8d9',
    width: '100%',
    paddingBottom: '3rem'
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

const Footer = ({ getCompany }) => {
  const classes = useStyles();

  const handleExitStock = () => {
    getCompany('');
  };

  return (
    <Container className={classes.root} component="footer">
      <Grid container justify="space-between" alignItems="center">
        <Grid container item xs={12} sm={6}>
          <Grid item xs={12} sm={12}>
            <NavLink exact to="/" component={Home}>
              <img
                src="/logo/logo_transparent_horizontal.png"
                alt="logo"
                className={classes.image}
                onClick={handleExitStock}
              />
            </NavLink>
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={12} sm={6}>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink
                exact
                to="/"
                component={Home}
                className={classes.links}
                onClick={handleExitStock}
              >
                Home
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.item}>
            <Typography variant="overline">
              <NavLink
                to="/explore/"
                component={Explore}
                className={classes.links}
                onClick={handleExitStock}
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
                onClick={handleExitStock}
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
                onClick={handleExitStock}
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
