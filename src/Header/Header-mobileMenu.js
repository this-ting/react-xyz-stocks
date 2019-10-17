import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

// import components
import Home from '../Home';
import Explore from '../Explore';
import User from '../User';
import Portfolio from '../Portfolio';
import LoginContext from '../LoginContext';

const useStyles = makeStyles({
  menu: {
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#fafafa',
      backgroundColor: '#37383c'
    }
  },
  menuItem: {
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit'
    }
  },
  list: {
    width: '250px'
  }
});

const MobileMenu = ({ handleMenuClick, handleExitStock }) => {
  const uid = useContext(LoginContext);
  const classes = useStyles();

  const renderLogin = uid ? 'USER' : 'LOGIN / SIGNUP';

  return (
    <div className={classes.list}>
      <List>
        <NavLink
          to="/"
          component={Home}
          className={classes.menuItem}
          onClick={() => {
            handleExitStock();
            handleMenuClick();
          }}
        >
          <ListItem className={classes.menu} key="HOME">
            <ListItemText primary="HOME" />
          </ListItem>
        </NavLink>

        <NavLink
          to="/explore/"
          component={Explore}
          className={classes.menuItem}
          onClick={() => {
            handleExitStock();
            handleMenuClick();
          }}
        >
          <ListItem button className={classes.menu} key="EXPLORE">
            <ListItemText primary="EXPLORE" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/portfolio/"
          component={Portfolio}
          className={classes.menuItem}
          onClick={() => {
            handleExitStock();
            handleMenuClick();
          }}
        >
          <ListItem className={classes.menu} key="PORTFOLIO">
            <ListItemText primary="PORTFOLIO" />
          </ListItem>
        </NavLink>
        <NavLink
          to="/user/"
          component={User}
          className={classes.menuItem}
          onClick={() => {
            handleExitStock();
            handleMenuClick();
          }}
        >
          <ListItem className={classes.menu} key="LOGIN">
            <ListItemText primary={renderLogin} />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default MobileMenu;
