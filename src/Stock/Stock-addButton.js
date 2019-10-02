import React, { useState, useEffect, useContext } from 'react';
import { Button, Tooltip, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as firebase from 'firebase/app';
import { db } from '../Firebase';

// import Components
import LoginContext from '../LoginContext.js';
import StockContext from '../StockContext';

const AddButton = ({ company }) => {
  const uid = useContext(LoginContext);
  const input = useContext(StockContext);

  const [watching, setWatching] = useState('');
  useEffect(() => {
    if (uid) {
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .doc(input.toUpperCase())
        .get()
        .then(doc => {
          if (doc.exists) {
            setWatching(true);
          } else {
            setWatching(false);
          }
        })
        .catch(error => console.error(error));
    }
  }, [input]);

  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    if (watching) {
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .doc(input.toUpperCase())
        .delete()
        .then(() => {
          setWatching(false);
          setOpen(true);
        })
        .then(() => {
          db.collection('users')
            .doc(uid)
            .update({
              watchlist: firebase.firestore.FieldValue.arrayRemove(
                input.toUpperCase()
              )
            });
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });
    } else {
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .doc(input.toUpperCase())
        .set({
          ticker: input.toUpperCase(),
          exchange: company.exchange,
          addedOn: firebase.firestore.FieldValue.serverTimestamp(),
          company: company.name
        })
        .then(() => {
          setWatching(true);
          setOpen(true);
        })
        .then(() => {
          db.collection('users')
            .doc(uid)
            .update({
              watchlist: firebase.firestore.FieldValue.arrayUnion(
                input.toUpperCase()
              )
            });
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (uid) {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleButtonClick}
        >
          {watching ? 'Following' : 'Add to Watchlist'}
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {watching
                ? `${company.name} added to watchlist!`
                : `${company.name} removed from watchlist!`}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
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
