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
  menuItem: {
    textDecoration: 'none',
    '&:visited': {
      color: '#37383c'
    },
    '&:hover': {
      color: '#3054b9'
    }
  }
});

const MobileMenu = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <nav>
      <Container className={classes.root}>
        <CloseIcon className={classes.closeIcon} onClick={handleClick} />
        <List>
          <ListItem>
            <Typography variant="h6">
              <NavLink
                to="/"
                component={Home}
                className={classes.menuItem}
                onClick={handleClick}
              >
                HOME
              </NavLink>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">
              <NavLink
                to="/markets/"
                component={Markets}
                className={classes.menuItem}
                onClick={handleClick}
              >
                EXPLORE
              </NavLink>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="h6">
              <NavLink
                to="/markets/"
                component={Markets}
                className={classes.menuItem}
                onClick={handleClick}
              >
                SEARCH
              </NavLink>
            </Typography>
          </ListItem>
        </List>
      </Container>
    </nav>
  );
};

export default MobileMenu;
