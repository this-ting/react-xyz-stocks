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
    db.collection('users')
      .doc(user)
      .collection('stocks')
      .get()
      .then(query => {
        query.forEach(doc => {
          data.push(doc.data());
        });
        setWatchItems(data);
        console.log(data);
      });

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
                    <TableCell>$221.030000</TableCell>
                    <TableCell>+1.54%</TableCell>
                    <TableCell>+$3.45</TableCell>

                    <TableCell>+19.34%</TableCell>
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
