import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Tab, Tabs, Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import component
import MobileMenu from './Mobile-menu.js';

const useStyles = makeStyles({
  header: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  logo: {
    height: '200px'
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
    <AppBar position="absolute" color="none" className={classes.header}>
      {showMenu === true ? <MobileMenu handleClick={handleClick} /> : null}
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={10} sm={7}>
          <img
            src="/logo/logo_transparent_red.png"
            alt="logo"
            className={classes.logo}
          />
        </Grid>
        <Hidden xsDown>
          <Grid item sm={5}>
            <Tabs variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="Home" to="/" component={NavLink} />
              <Tab label="Markets" to="/markets/" component={NavLink} />
            </Tabs>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid item xs={2}>
            <MenuIcon onClick={handleClick} />
          </Grid>
        </Hidden>
      </Grid>
    </AppBar>
  );
}

export default Header;
