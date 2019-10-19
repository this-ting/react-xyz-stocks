import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// import components
import Home from '../Home';
import Explore from '../Explore';
import Portfolio from '../Portfolio';
import LoginButton from './LoginButton';

const useStyles = makeStyles({
  root: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#212121'
  },
  menu: {
    color: '#fafafa',
    '&:hover': {
      backgroundColor: '#37383c'
    }
  },
  menuItem: {
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit'
    },
    '&:link': {
      color: 'inherit'
    },
    '&:active': {
      color: 'inherit'
    }
  },
  menuIcon: {
    color: '#fafafa'
  }
});

const MobileMenu = ({ handleMenuClick, handleExitStock }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
            <ListItemIcon>
              <HomeIcon className={classes.menuIcon} />
            </ListItemIcon>
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
            <ListItemIcon>
              <ExploreIcon className={classes.menuIcon} />
            </ListItemIcon>
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
            <ListItemIcon>
              <BookmarkIcon className={classes.menuIcon} />
            </ListItemIcon>
            <ListItemText primary="PORTFOLIO" />
          </ListItem>
        </NavLink>
        <ListItem className={classes.menu} key="LOGIN">
          <LoginButton />
        </ListItem>
      </List>
    </div>
  );
};

export default MobileMenu;
