import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, List, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// import components
import Home from '../Home';
import Markets from '../Markets';
import User from '../User';
import Portfolio from '../User/portfolio.js';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ECECEE',
    position: 'fixed',
    textAlign: 'right',
    padding: '4.5rem',
    animation: '$showMenu 0.6s both',
    animationTimingFunction: 'ease-out'
  },
  '@keyframes showMenu': {
    from: {
      transform: 'translate3d(100vw, 0px, 4px)'
    },
    to: {
      transform: 'translate3d(0px, 0px, 0px)'
    }
  },
  closeIcon: {
    textAlign: 'right',
    height: '35px',
    width: '35px'
  },
  menu: {
    '-webkit-transition': 'color 0.3s ease',
    '-moz-transition': 'color 0.3s ease',
    '-0-transition': 'color 0.3s ease',
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
  }
});

const MobileMenu = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="nav">
      <CloseIcon className={classes.closeIcon} onClick={handleClick} />
      <List>
        <NavLink
          to="/"
          component={Home}
          className={classes.menuItem}
          onClick={handleClick}
        >
          <ListItem className={classes.menu}>
            <Typography variant="h6">HOME</Typography>
          </ListItem>
        </NavLink>

        <NavLink
          to="/markets/"
          component={Markets}
          className={classes.menuItem}
          onClick={handleClick}
        >
          <ListItem className={classes.menu}>
            <Typography variant="h6">EXPLORE</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to="/portfolio/"
          component={Portfolio}
          className={classes.menuItem}
          onClick={handleClick}
        >
          <ListItem className={classes.menu}>
            <Typography variant="h6">PORTFOLIO</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          to="/user/"
          component={User}
          className={classes.menuItem}
          onClick={handleClick}
        >
          <ListItem className={classes.menu}>
            <Typography variant="h6">LOGIN / SIGNUP</Typography>
          </ListItem>
        </NavLink>
      </List>
    </Container>
  );
};

export default MobileMenu;
