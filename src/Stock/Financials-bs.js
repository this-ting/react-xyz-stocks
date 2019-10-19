import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip
} from '@material-ui/core';

// import components
import StockContext from '../StockContext.js';
import formatNumber from '../lib';

const BS = ({ index }) => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [balance, setBalance] = useState('');
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
      .catch(error => console.error(`Error with BS component: ${error}`));
    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (balance) {
    const { cash, currAssets, assets, currLib, lib, shareholdersEq } = balance[
      index
    ];
    return (
      <Table>
        <TableHead>
          <TableRow>
            <Tooltip
              placement="right"
              title="A financial statement that reports a company's assets, liabilities and shareholders' equity at a specific point in time"
            >
              <TableCell>BALANCE STATEMENT</TableCell>
            </Tooltip>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Cash and cash equivalents:</TableCell>
            <TableCell align="right">{formatNumber(cash)}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Total current assets:</TableCell>
            <TableCell align="right">{formatNumber(currAssets)}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Total assets:</TableCell>
            <TableCell align="right">{formatNumber(assets)}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Total current liabilities:</TableCell>
            <TableCell align="right">{formatNumber(currLib)}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Total liabilities:</TableCell>
            <TableCell align="right">{formatNumber(lib)}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Total shareholders equity:</TableCell>
            <TableCell align="right">{formatNumber(shareholdersEq)}</TableCell>
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
