import React, { useState, useEffect, useRef } from 'react';
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
import { db } from '../Firebase.js';

// import components
import Watchlist from './portfolio-watchlist.js';
import PortfolioNews from './portfolio-news.js';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px'
  }
});

const Portfolio = () => {
  const classes = useStyles();

  // check for mounted component
  const mounted = useRef(false);

  const data = [];
  const user = 'PuqnfR7XgVU6N4EknUxZ';

  const [following, setFollowing] = useState('');
  useEffect(() => {
    mounted.current = true;
    // get user's following stocks from FireStore, then fetch API
    db.collection('users')
      .doc(user)
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

    return () => {
      mounted.current = false;
    };
  }, [user]);

  const [companies, setCompanies] = useState('');
  useEffect(() => {
    mounted.current = true;

    db.collection('users')
      .doc(user)
      .get()
      .then(doc => {
        setCompanies(doc.data().watchlist);
      })
      .catch(error => console.error(error));

    return () => {
      mounted.current = false;
    };
  }, [user]);

  return (
    <Container className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Portfolio
      </Typography>
      <br />
      <Watchlist following={following} />
      <br />
      <PortfolioNews companies={companies} />
    </Container>
  );
};

export default Portfolio;
