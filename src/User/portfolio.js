import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

// import components
import Watchlist from './portfolio-watchlist.js';
import PortfolioNews from './portfolio-news.js';
import LoginContext from '../LoginContext';
import User from './index.js';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px'
  }
});

const Portfolio = () => {
  const uid = useContext(LoginContext);
  const classes = useStyles();

  // check for mounted component
  const mounted = useRef(false);

  // //////////////////////////////////////////////////////////////////////////
  // functions below are passed down as a prop to addButton
  // //////////////////////////////////////////////////////////////////////////

  const data = [];
  const [following, setFollowing] = useState('');
  useEffect(() => {
    mounted.current = true;

    if (uid) {
      // get user's following stocks from FireStore, then fetch API
      db.collection('users')
        .doc(uid)
        .collection('stocks')
        .get()
        .then(query => {
          query.forEach(doc => {
            data.push(doc.data());
          });
          return data;
        })
        .then(data => {
          let loaded = 0;
          for (let i = 0; i < data.length; i++) {
            fetch(
              `https://sandbox.iexapis.com/stable/stock/${data[i].ticker}/previous?filter=date,close,changePercent,change&token=Tpk_7190efa09280470180ab8bb6635da780`
            )
              .then(response => response.json())
              .then(apiData => {
                data[i].date = apiData.date;
                data[i].close = apiData.close;
                data[i].changePercent = apiData.changePercent.toFixed(2);
                data[i].change = apiData.change.toFixed(2);
                loaded++;
                if (loaded >= data.length) {
                  setFollowing(data);
                }
              });
          }
        })
        .catch(error => console.error(error));
    }

    return () => {
      mounted.current = false;
    };
  }, [uid]);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleDelete = e => {
    console.log('delete');
    const deleteValue = e.currentTarget.attributes.ticker.nodeValue;
    const newState = following.filter(follow => follow.ticker !== deleteValue);
    setFollowing(newState);
    db.collection('users')
      .doc(uid)
      .collection('stocks')
      .doc(deleteValue)
      .delete()
      .then(() => {
        console.log(`${deleteValue} successfully deleted!`);
        setOpen(true);
      })
      .then(() => {
        db.collection('users')
          .doc(uid)
          .update({
            watchlist: firebase.firestore.FieldValue.arrayRemove(
              deleteValue.toUpperCase()
            )
          });
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  };

  // ////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////

  const [companies, setCompanies] = useState('');
  useEffect(() => {
    if (uid) {
      mounted.current = true;

      db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          console.log('useEffect' + doc.data().watchlist);
          setCompanies(doc.data().watchlist);
        })
        .catch(error => console.error(error));
    }
    return () => {
      mounted.current = false;
    };
  }, [uid]);

  if (uid) {
    return (
      <Container className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Portfolio
        </Typography>
        <br />
        <Watchlist
          following={following}
          handleDelete={handleDelete}
          open={open}
          handleClose={handleClose}
        />
        <br />
        <PortfolioNews companies={companies} />
      </Container>
    );
  }

  return <User />;
};

export default Portfolio;
