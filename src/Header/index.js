import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar,
  Tab,
  Tabs,
  Grid,
  Hidden,
  IconButton,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// import component
import Home from '../Home';
import MobileMenu from './Mobile-menu.js';
import LoginContext from '../LoginContext';

const useStyles = makeStyles({
  header: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  logo: {
    height: '200px'
  },
  menuIcon: {
    height: '35px',
    zIndex: '3',
    '-webkit-transition': 'color 0.3s ease',
    '-moz-transition': 'color 0.3s ease',
    '-0-transition': 'color 0.3s ease',
    '&:hover': {
      color: '#3054b9'
    }
  }
});

const Header = () => {
  const uid = useContext(LoginContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu(prevState => {
      if (prevState === false) {
        return true;
      }
      return false;
    });
  };

  if (uid) {
    return (
      <AppBar position="absolute" color="default" className={classes.header}>
        {showMenu === true ? <MobileMenu handleClick={handleClick} /> : null}
        <Grid container md alignItems="center" justify="flex-end">
          <Grid item xs={10} sm={6} md={4}>
            <Link to="/" component={Home}>
              <img
                src="/logo/logo_transparent_red.png"
                alt="logo"
                className={classes.logo}
              />
            </Link>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={4}>
              <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Explore" to="/markets/" component={NavLink} />
                <Tab label="Portfolio" to="/portfolio/" component={NavLink} />
              </Tabs>
            </Grid>
            <Grid sm={2}>
              <IconButton aria-label="user">
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={2}>
              <MenuIcon onClick={handleClick} className={classes.menuIcon} />
            </Grid>
          </Hidden>
        </Grid>
      </AppBar>
    );
  }

  return (
    <AppBar position="absolute" color="default" className={classes.header}>
      {showMenu === true ? <MobileMenu handleClick={handleClick} /> : null}
      <Grid container alignItems="center" justify="flex-end">
        <Grid item xs={10} sm={6} md={4}>
          <Link to="/" component={Home}>
            <img
              src="/logo/logo_transparent_red.png"
              alt="logo"
              className={classes.logo}
            />
          </Link>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={4}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Markets" to="/markets/" component={NavLink} />
              <Tab label="Portfolio" to="/portfolio/" component={NavLink} />
            </Tabs>
          </Grid>
          <Grid item sm={2}>
            <Button variant="contained" color="secondary">
              Login
            </Button>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={2}>
            <MenuIcon onClick={handleClick} className={classes.menuIcon} />
          </Grid>
        </Hidden>
      </Grid>
    </AppBar>
  );
};

export default Header;
