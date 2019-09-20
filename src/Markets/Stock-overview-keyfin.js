import React, { useContext, useState, useEffect, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';
import StockContext from './StockContext.js';

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
      <Paper>
        <h2>Financials</h2>
        <Grid container direction="column">
          <Grid item>As of the most recent quarter: {date}</Grid>
          <Grid item>Revenue: ${revenue}</Grid>
          <Grid item>Net Income: $ {netIncome}</Grid>
          <Grid item>Net Profit Margin: {netProfitMargin * 100} %</Grid>
          <Grid item>EPS: $ {eps}</Grid>
        </Grid>
      </Paper>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default KeyFin;
