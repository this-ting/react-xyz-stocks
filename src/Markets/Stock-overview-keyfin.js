import React, { useContext, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import StockContext from './StockContext.js';

const KeyFin = () => {
  // context
  const input = useContext(StockContext);

  const initialState = {
    date: '',
    revenue: '',
    netIncome: '',
    netProfitMargin: '',
    eps: ''
  };

  const [stats, setStats] = useState(initialState);
  useEffect(() => {
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
        setStats(info);
      });
  });

  if (stats) {
    const { date, revenue, netIncome, netProfitMargin, eps } = stats;

    return (
      <Paper>
        <h2>Financials</h2>
        <Grid container direction="column">
          <Grid item>As of the most recent quarter: {date}</Grid>
          <Grid item>Revenue: ${revenue}</Grid>
          <Grid item>Net Income: $ {netIncome}</Grid>
          <Grid item>Net Profit Margin: {netProfitMargin} %</Grid>
          <Grid item>EPS: $ {eps}</Grid>
        </Grid>
      </Paper>
    );
  }
};

export default KeyFin;
