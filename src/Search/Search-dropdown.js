import React, { useState, useEffect, useRef } from 'react';
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
    overflow: 'auto',
    borderRadius: '4px',
    boxShadow: [
      '0px 1px 3px 0px rgba(0,0,0,0.2)',
      '0px 1px 1px 0px rgba(0,0,0,0.14)',
      '0px 2px 1px -1px rgba(0,0,0,0.12)'
    ]
  }
});

const Dropdown = ({ input, setInput, getCompany }) => {
  // check for component mount
  const mounted = useRef(false);

  const classes = useStyles();
  const entries = [];

  const [info, setInfo] = useState('');
  useEffect(() => {
    mounted.current = true;
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
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // clearing state will hide Dropdown Menu
  const handleClickAway = () => {
    setInput('');
    mounted.current = false;
  };

  // lift state up to ./Markets/index.js & clear state
  const handleClickDropdown = e => {
    getCompany(e.currentTarget.id.toUpperCase());
    setInput('');
    mounted.current = false;
  };

  const renderDropdown = info
    ? info.map(inf => {
        return (
          <ListItem
            button
            onClick={handleClickDropdown}
            id={inf.ticker}
            key={inf.ticker}
          >
            <ListItemText
              primary={inf.company}
              secondary={`${inf.exchange}: ${inf.ticker}`}
            />
          </ListItem>
        );
      })
    : null;

  return (
    <Container>
      <ClickAwayListener onClickAway={handleClickAway}>
        <List className={classes.root}>{renderDropdown}</List>
      </ClickAwayListener>
    </Container>
  );
};

export default Dropdown;
