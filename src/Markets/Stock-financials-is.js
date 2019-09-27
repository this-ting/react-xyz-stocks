import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody
} from '@material-ui/core';
import StockContext from './StockContext.js';
import formatNumber from '../lib';

const IS = props => {
  const { index } = props;
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = [
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    }
  ];

  const [income, setIncome] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/income-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const is = [];
        for (let i = 0; i < info.length; i++) {
          is[i] = {};
          is[i].rev = info[i]['Revenue'];
          is[i].costOfRev = info[i]['Cost of Revenue'];
          is[i].gp = info[i]['Gross Profit'];
          is[i].gm = info[i]['Gross Margin'];
          is[i].opEx = info[i]['Operating Expenses'];
          is[i].opIncome = info[i]['Operating Income'];
          is[i].ni = info[i]['Net Income'];
          is[i].npm = info[i]['Net Profit Margin'];
        }
        // check if mounted
        if (mounted.current) {
          setIncome(is);
        }
      })
      .catch(error => alert(`Error with IS component: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (income[index]) {
    const { rev, costOfRev, gp, gm, opEx, opIncome, ni, npm } = income[index];
    return (
      <Table>
        <TableHead>
          <TableRow hover>
            <TableCell>INCOME STATEMENT</TableCell>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Revenue:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(rev))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Cost of Revenue:</TableCell>
            <TableCell align="right">
              {formatNumber(parseInt(costOfRev))}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Gross Profit:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(gp))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Gross Margin:</TableCell>
            <TableCell align="right">{gm * 100} %</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Operating Expenses:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(opEx))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Operating Income:</TableCell>
            <TableCell align="right">
              {formatNumber(parseInt(opIncome))}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Net Income:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(ni))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Net Profit Margin:</TableCell>
            <TableCell align="right">{npm * 100} %</TableCell>
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

export default IS;
