import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, List, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// import components
import Home from '../Home';
import Markets from '../Markets';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#FBFEFF',
    position: 'fixed',
    textAlign: 'right',
    padding: '4.5rem',
    transition: 'margin 0.5s'
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
          to="/markets/"
          component={Markets}
          className={classes.menuItem}
          onClick={handleClick}
        >
          <ListItem className={classes.menu}>
            <Typography variant="h6">SEARCH</Typography>
          </ListItem>
        </NavLink>
      </List>
    </Container>
  );
};

export default MobileMenu;
