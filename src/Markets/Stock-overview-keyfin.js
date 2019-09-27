import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Paper,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import StockContext from './StockContext.js';
import formatNumber from '../lib';

const KeyFin = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = {
    date: '',
    revenue: '',
    netIncome: '',
    netProfitMargin: '',
    eps: ''
  };

  const [stats, setStats] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/income-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.date = data.financials[0].date;
        info.revenue = data.financials[0].Revenue;
        info.netIncome = data.financials[0]['Net Income'];
        info.netProfitMargin = data.financials[0]['Net Profit Margin'];
        info.eps = data.financials[0].EPS;
        if (mounted.current) {
          setStats(info);
        }
      })
      .catch(error => alert(`Error with Key Fin component: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (stats) {
    const { date, revenue, netIncome, netProfitMargin, eps } = stats;

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Snapshot Financials
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>As of the most recent quarter:</TableCell>
                <TableCell>{date}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Revenue:</TableCell>
                <TableCell>{formatNumber(parseInt(revenue))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Income:</TableCell>
                <TableCell>{formatNumber(parseInt(netIncome))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Profit Margin</TableCell>
                <TableCell>{netProfitMargin * 100} %</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EPS</TableCell>
                <TableCell>$ {eps}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default KeyFin;
