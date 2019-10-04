import React from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  IconButton,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';

import { db } from '../Firebase.js';

const useStyles = makeStyles({
  plusPercent: {
    color: '#4F9E59'
  },
  minusPercent: {
    color: '#D3483A'
  },
  plus: {
    color: '#4F9E59'
  },
  minus: {
    color: '#D3483A'
  },
  row: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  skeleton: {
    margin: '2px 0'
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
    const input = e.currentTarget.attributes.ticker.nodeValue;
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

  const renderRows = following ? (
    following.map(follow => {
      return (
        <TableRow hover key={follow.ticker} className={classes.row}>
          <TableCell
            {...{ ticker: follow.ticker }}
            onClick={handleCompanyClick}
          >
            {follow.ticker}
          </TableCell>
          <Hidden smUp>
            <TableCell align="right">{follow.close}</TableCell>
          </Hidden>

          <Hidden xsDown>
            <TableCell
              {...{ ticker: follow.ticker }}
              onClick={handleCompanyClick}
            >
              {follow.company}
            </TableCell>
            <TableCell align="right">{follow.close}</TableCell>
            {/* {renderPriceColor(follow.change)} */}
          </Hidden>

          {renderPercentColor(follow.changePercent)}
          <TableCell>
            <IconButton
              color="inherit"
              onClick={handleDelete}
              {...{ ticker: follow.ticker }}
            >
              <DeleteIcon />
            </IconButton>
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
  ) : (
    <>
      <TableRow>
        <TableCell colSpan={5} align="center">
          Add companies to your watchlist!
        </TableCell>
      </TableRow>
    </>
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Watchlist
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <Hidden smUp>
              <TableCell align="right">Price</TableCell>
            </Hidden>

            <Hidden xsDown>
              <TableCell>Company</TableCell>
              <TableCell align="right">Price</TableCell>
              {/* {renderPriceColor(follow.change)} */}
            </Hidden>

            {/* <TableCell align="right">$ Change</TableCell> */}
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
