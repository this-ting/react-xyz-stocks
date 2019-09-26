import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { db } from '../Firebase.js';

const Watchlist = () => {
  // check for mounted component
  const mounted = useRef(false);
  const data = [];
  const user = 'PuqnfR7XgVU6N4EknUxZ';

  const [watchItems, setWatchItems] = useState('');
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
                setWatchItems(data);
              }
            });
        }
      })
      .catch(error => alert(error));

    return () => {
      mounted.current = false;
    };
  }, [user]);

  return (
    <Container>
      <Typography variant="h6" gutterBottom="true">
        Watchlist
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>% change</TableCell>
            <TableCell>Change</TableCell>
            <TableCell>Return</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchItems
            ? watchItems.map(items => {
                return (
                  <TableRow>
                    <TableCell>{items.ticker}</TableCell>
                    <TableCell>{items.company}</TableCell>
                    <TableCell>{items.close}</TableCell>
                    <TableCell>{items.changePercent}</TableCell>
                    <TableCell>{items.change}</TableCell>
                    <TableCell>
                      {(
                        ((items.entryPrice - items.close) / items.close) *
                        100
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Watchlist;
