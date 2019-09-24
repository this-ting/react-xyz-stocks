import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, List, ListItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#FBFEFF',
    position: 'fixed'
  }
});

const MobileMenu = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <nav>
        <CloseIcon onClick={handleClick} />
        <List>
          <ListItem>HOME</ListItem>
          <ListItem>EXPLORE</ListItem>
          <ListItem>SEARCH</ListItem>
        </List>
      </nav>
    </Container>
  );
};

export default MobileMenu;
