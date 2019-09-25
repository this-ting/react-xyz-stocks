import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import StockContext from './StockContext.js';

const useStyles = makeStyles({
  // tableHead: {
  //   backgroundColor: '#333333'
  // }
});

const BS = props => {
  const classes = useStyles();
  const { index } = props;
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = [
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    }
  ];

  const [balance, setBalance] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const bs = [];
        for (let i = 0; i < info.length; i++) {
          bs[i] = {};
          bs[i].cash = info[i]['Cash and cash equivalents'];
          bs[i].currAssets = info[i]['Total current assets'];
          bs[i].assets = info[i]['Total assets'];
          bs[i].currLib = info[i]['Total current liabilities'];
          bs[i].lib = info[i]['Total liabilities'];
          bs[i].shareholdersEq = info[i]['Total shareholders equity'];
        }
        if (mounted.current) {
          setBalance(bs);
        }
      })
      .catch(error => alert(`Error with BS component: ${error}`));
    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (balance[index]) {
    const { cash, currAssets, assets, currLib, lib, shareholdersEq } = balance[
      index
    ];
    return (
      <Table>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell>BALANCE STATEMENT</TableCell>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Cash and cash equivalents:</TableCell>
            <TableCell align="right">{cash}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total current assets:</TableCell>
            <TableCell align="right">{currAssets}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total assets:</TableCell>
            <TableCell align="right">{assets}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total current liabilities:</TableCell>
            <TableCell align="right">{currLib}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total liabilities:</TableCell>
            <TableCell align="right">{lib}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total shareholders equity:</TableCell>
            <TableCell align="right">{shareholdersEq}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default BS;
