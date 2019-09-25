import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { db } from '../Firebase.js';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#EAEAEA',
    zIndex: 2,
    position: 'absolute',
    width: '88%',
    overflow: 'auto'
  }
});

const Dropdown = ({ input, setInput, getCompany }) => {
  const classes = useStyles();
  const entries = [];

  const [info, setInfo] = useState('');
  useEffect(() => {
    if (input) {
      const searchDB = db.collection('search');
      searchDB
        .where('input', 'array-contains', input.toLowerCase())
        .limit(5)
        .get()
        .then(query => {
          query.forEach(doc => {
            const data = doc.data();
            const entry = {
              company: data.company,
              ticker: data.ticker.toUpperCase(),
              exchange: data.exchange.toUpperCase()
            };
            entries.push(entry);
          });
          setInfo(entries);
        })
        .catch(error =>
          console.error(`There is an search FireStore error: ${error}`)
        );
    }
  }, [input]);

  // clearing state will hide Dropdown Menu
  const handleClickAway = () => {
    setInput('');
  };

  // lift state up to ./Markets/index.js & clear state
  const handleClick = e => {
    getCompany(e.currentTarget.id);
    setInput('');
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={handleClickAway}>
        <List className={classes.root}>
          {info
            ? info.map(info => {
                return (
                  <ListItem button onClick={handleClick} id={info.ticker}>
                    <ListItemText
                      primary={info.company}
                      secondary={`${info.exchange}: ${info.ticker}`}
                    />
                  </ListItem>
                );
              })
            : null}
        </List>
      </ClickAwayListener>
    </Container>
  );
};

export default Dropdown;
