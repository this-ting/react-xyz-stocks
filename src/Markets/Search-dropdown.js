import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'grey',
    opacity: '1',
    zIndex: 2,
    position: 'absolute',
    width: '80%'
  }
});

const Dropdown = ({ entries }) => {
  const classes = useStyles();
  const [haveSuggest, setHaveSuggest] = useState('');

  console.log(entries);
  const display = entries.map(entries => {
    return (
      <>
        <p>{entries.company}</p>
        <p>{entries.ticker}</p>
        <p>{entries.exchange}</p>
      </>
    );
  });

  console.log(display);
  return (
    <Container>
      <List className={classes.root}>
        <ListItem>
          <ListItemText primary="Apple Inc" secondary="NASDAQ: AAPL" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Apple Inc" secondary="NASDAQ: AAPL" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Apple Inc" secondary="NASDAQ: AAPL" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Apple Inc" secondary="NASDAQ: AAPL" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Apple Inc" secondary="NASDAQ: AAPL" />
        </ListItem>
      </List>
    </Container>
  );
};

export default Dropdown;
