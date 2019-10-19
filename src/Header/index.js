import React, { useState, useEffect } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import {
  AppBar,
  Container,
  Tab,
  Tabs,
  Grid,
  Hidden,
  Drawer
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import components
import Home from '../Home';
import MobileMenu from './MobileMenu';
import LoginButton from './LoginButton';

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

const Header = ({ getCompany, location }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(() => {
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

  return (
    <AppBar position="absolute" color="default" className={classes.header}>
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
                  to="/explore"
                  component={NavLink}
                  value={1}
                />
                <Tab
                  label="Portfolio"
                  to="/portfolio"
                  component={NavLink}
                  value={2}
                />
              </Tabs>
            </Grid>
            <Grid item sm={2} className={classes.userIcon}>
              <LoginButton />
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={2}>
              <MenuIcon
                onClick={handleMenuClick}
                className={classes.menuIcon}
              />
              <Drawer anchor="right" open={showMenu} onClose={handleMenuClick}>
                <MobileMenu
                  handleMenuClick={handleMenuClick}
                  handleExitStock={handleExitStock}
                />
              </Drawer>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default withRouter(Header);
