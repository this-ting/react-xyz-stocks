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

const Watchlist = ({ following }) => {
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
          {following
            ? following.map(follow => {
                return (
                  <TableRow>
                    <TableCell>{follow.ticker}</TableCell>
                    <TableCell>{follow.company}</TableCell>
                    <TableCell>{follow.close}</TableCell>
                    <TableCell>{follow.changePercent}</TableCell>
                    <TableCell>{follow.change}</TableCell>
                    <TableCell>
                      {(
                        ((follow.entryPrice - follow.close) / follow.close) *
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
