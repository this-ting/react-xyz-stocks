import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import {
  AppBar,
  Container,
  Tab,
  Tabs,
  Grid,
  Hidden,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { auth } from '../Firebase.js';

// import component
import Home from '../Home';
import MobileMenu from './Header-mobileMenu.js';
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
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#3054b9'
    }
  },
  userIcon: {
    textAlign: 'center'
  }
});

const Header = ({ getCompany, location, match }) => {
  const uid = useContext(LoginContext);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log(location);
    console.log(match);
    if (location.pathname === '/') {
      setValue(0);
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(prevState => {
      if (prevState === false) {
        return true;
      }
      return false;
    });
  };

  const handleExitStock = () => {
    getCompany('');
  };

  const renderLoginButton = uid ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => auth.signOut()}
    >
      Log Out
    </Button>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      to="/user/"
      component={NavLink}
    >
      Login
    </Button>
  );

  const renderMobileMenu =
    showMenu === true ? (
      <MobileMenu
        handleMenuClick={handleMenuClick}
        handleExitStock={handleExitStock}
      />
    ) : null;

  return (
    <AppBar position="absolute" color="default" className={classes.header}>
      {renderMobileMenu}
      <Container>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item xs={10} sm={6} md={4}>
            <Link to="/" component={Home}>
              <img
                src="/logo/logo_transparent_red.png"
                alt="logo"
                className={classes.logo}
                onClick={handleExitStock}
                onKeyPress={handleExitStock}
              />
            </Link>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={4}>
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                onClick={handleExitStock}
              >
                <Tab
                  label="Explore"
                  to="/explore/"
                  component={NavLink}
                  value={1}
                />
                <Tab
                  label="Portfolio"
                  to="/portfolio/"
                  component={NavLink}
                  value={2}
                />
              </Tabs>
            </Grid>
            <Grid item sm={2} className={classes.userIcon}>
              {renderLoginButton}
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={2}>
              <MenuIcon
                onClick={handleMenuClick}
                className={classes.menuIcon}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default withRouter(Header);
