import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';

import StockContext from './StockContext.js';

const GraphStats = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  // stats
  const [stats, setStats] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats?filter=marketcap,week52high,week52low,ttmEPS,dividendYield,peRatio,beta&token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setStats(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  const {
    marketcap,
    ttmEPS,
    beta,
    peRatio,
    dividendYield,
    week52low,
    week52high
  } = stats;

  return (
    <Paper>
      <h2>Graph Stats</h2>
      <Grid container direction="column">
        <Grid item>Market Cap: {marketcap}</Grid>
        <Grid item>EPS: ${ttmEPS}</Grid>
        <Grid item>Beta: {beta}</Grid>
        <Grid item>P/E ratio: {peRatio}</Grid>
        <Grid item>Div Yield: {dividendYield * 100} %</Grid>
        <Grid item>52-week Low: {week52low}</Grid>
        <Grid item>52-week High: {week52high}</Grid>
      </Grid>
    </Paper>
  );
};

export default GraphStats;
