import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import { db } from '../Firebase.js';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#EAEAEA',
    opacity: '1',
    zIndex: 2,
    position: 'absolute',
    width: '83%'
  }
});

const Dropdown = ({ input }) => {
  const classes = useStyles();
  const entries = [];

  const [info, setInfo] = useState('');
  useEffect(() => {
    if (input) {
      const searchDB = db.collection('search');
      searchDB
        .where('input', 'array-contains', input)
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
          console.log(entries);
        })
        .catch(error =>
          console.error(`There is an search FireStore error: ${error}`)
        );
    }
  }, [input]);

  return (
    <Container>
      <List className={classes.root}>
        {info
          ? info.map(test => {
              return (
                <ListItem button>
                  <ListItemText
                    primary={test.company}
                    secondary={`${test.exchange}: ${test.ticker}`}
                  />
                </ListItem>
              );
            })
          : null}
      </List>
    </Container>
  );
};

export default Dropdown;
