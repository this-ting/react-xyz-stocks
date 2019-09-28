import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as firebase from 'firebase/app';
import { db } from '../Firebase';

// import Components
import LoginContext from '../LoginContext.js';
import StockContext from './StockContext';

const AddButton = ({ company }) => {
  const uid = useContext(LoginContext);
  const input = useContext(StockContext);

  const [watching, setWatching] = useState('');
  useEffect(() => {
    console.log('Add');
    db.collection('users')
      .doc(uid)
      .collection('stocks')
      .doc(input.toUpperCase())
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log(doc);
          console.log('following');
          setWatching('Already Following');
        } else {
          console.log('not following');
          setWatching('Add to Watchlist');
        }
      });
  }, [input]);

  const handleClick = () => {
    if (watching === 'Already Following') {
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .doc(input.toUpperCase())
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          setWatching('Add to Watchlist');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    }
    if (watching === 'Add to Watchlist') {
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .doc(input.toUpperCase())
        .set({
          ticker: input.toUpperCase(),
          exchange: company.exchange,
          entryPrice: 123,
          addedOn: firebase.firestore.FieldValue.serverTimestamp(),
          company: company.name
        })
        .then(() => {
          console.log(`${input} successfully added!`);
          setWatching('Already Following');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    }
  };

  if (uid) {
    return (
      <>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          {watching}
        </Button>
      </>
    );
  }
  return (
    <>
      <Tooltip title="Login to add to watchlist!">
        <span>
          <Button disabled variant="contained">
            Add to watchlist
          </Button>
        </span>
      </Tooltip>
    </>
  );
};

export default AddButton;
