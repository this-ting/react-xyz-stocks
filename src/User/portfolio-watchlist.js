import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Snackbar,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { db } from '../Firebase.js';

const Watchlist = ({
  following,
  handleDelete,
  open,
  handleClose,
  getCompany
}) => {
  const handleCompanyClick = e => {
    const input = e.currentTarget.firstChild.textContent;
    getCompany(input);
  };

  const renderRows = following
    ? following.map(follow => {
        return (
          <TableRow hover key={follow.ticker} onClick={handleCompanyClick}>
            <TableCell>{follow.ticker}</TableCell>
            <TableCell>{follow.company}</TableCell>
            <TableCell>{follow.close}</TableCell>
            <TableCell>{follow.changePercent}</TableCell>
            <TableCell>{follow.change}</TableCell>
            {/* <TableCell>
              {(
                ((follow.entryPrice - follow.close) / follow.close) *
                100
              ).toFixed(2)}
            </TableCell> */}
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDelete}
                {...{ ticker: follow.ticker }}
              >
                Remove
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
                message={<span id="message-id">Removed from Watchlist!</span>}
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
            </TableCell>
          </TableRow>
        );
      })
    : null;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Watchlist
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>% Change</TableCell>
            <TableCell>$ Change</TableCell>
            {/* <TableCell>Return</TableCell> */}
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </>
  );
};

export default Watchlist;
