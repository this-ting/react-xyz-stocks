import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppBar, Tab, Tabs, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import component
import Home from '../Home';
import MobileMenu from './Mobile-menu.js';

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

function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    console.log('clicked');
    setShowMenu(prevState => {
      if (prevState === false) {
        return true;
      }
      return false;
    });
  };

  return (
    <AppBar position="absolute" color="default" className={classes.header}>
      {showMenu === true ? <MobileMenu handleClick={handleClick} /> : null}
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={10} sm={7}>
          <Link to="/" component={Home}>
            <img
              src="/logo/logo_transparent_red.png"
              alt="logo"
              className={classes.logo}
            />
          </Link>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={5}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" to="/" component={NavLink} />
              <Tab label="Markets" to="/markets/" component={NavLink} />
            </Tabs>
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

export default Header;
