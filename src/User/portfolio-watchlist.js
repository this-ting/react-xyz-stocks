/* eslint-disable no-useless-escape */
/* eslint-disable-next-line prettier/prettier */
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

const useStyles = makeStyles({
  plusPercent: {
    color: '#4F9E59'
    // alignItems: 'center',
    // display: 'flex'
  },
  minusPercent: {
    color: '#D3483A'
    // alignItems: 'center',
    // display: 'flex'
  },
  plus: {
    color: '#4F9E59'
  },
  minus: {
    color: '#D3483A'
  }
});

const Watchlist = ({
  following,
  handleDelete,
  open,
  handleClose,
  getCompany
}) => {
  const classes = useStyles();
  const handleCompanyClick = e => {
    const input = e.currentTarget.firstChild.textContent;
    getCompany(input);
  };

  const renderPercentColor = (change, symbol) => {
    if (change > 0) {
      return (
        <TableCell align="right" className={classes.plusPercent}>
          {change} {symbol}
          <ArrowUpwardIcon />
        </TableCell>
      );
    }
    if (change < 0) {
      return (
        <TableCell align="right" className={classes.minusPercent}>
          {change} {symbol}
          <ArrowDownwardIcon />
        </TableCell>
      );
    }
  };

  const renderPriceColor = change => {
    if (change > 0) {
      return (
        <TableCell align="right" className={classes.plus}>
          {change}
        </TableCell>
      );
    }
    if (change < 0) {
      return (
        <TableCell align="right" className={classes.minus}>
          {change}
        </TableCell>
      );
    }
  };

  const renderRows = following
    ? following.map(follow => {
        return (
          <TableRow hover key={follow.ticker} onClick={handleCompanyClick}>
            <TableCell>{follow.ticker}</TableCell>
            <TableCell>{follow.company}</TableCell>
            <TableCell align="right">{follow.close}</TableCell>
            {renderPriceColor(follow.change)}
            {renderPercentColor(follow.changePercent)}
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
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">$ Change</TableCell>
            <TableCell align="right">% Change</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </>
  );
};

export default Watchlist;
