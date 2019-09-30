import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import StockContext from '../StockContext.js';
import formatNumber from '../lib';

const useStyles = makeStyles({
  row: {
    display: 'inline-flex'
  }
});

const GraphStats = () => {
  const classes = useStyles();
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

  if (stats) {
    return (
      <>
        <Typography variant="overline">
          <Grid container direction="column" wrap="wrap">
            <Grid container item xs={12}>
              <Grid item xs={3}>
                Market Cap:
              </Grid>
              <Grid item xs={3}>
                {formatNumber(marketcap)}
              </Grid>
              <Grid item xs={3}>
                P/E ratio:
              </Grid>
              <Grid item xs={3}>
                {peRatio.toFixed(2)}
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={3}>
                Beta:
              </Grid>
              <Grid item xs={3}>
                {beta.toFixed(2)}
              </Grid>
              <Grid item xs={3}>
                52-week High:
              </Grid>
              <Grid item xs={3}>
                {week52high.toFixed(2)}
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={3}>
                Div Yield:
              </Grid>
              <Grid item xs={3}>
                {(dividendYield * 100).toFixed(2)} %
              </Grid>
              <Grid item xs={3}>
                52-week Low:
              </Grid>
              <Grid item xs={3}>
                {week52low.toFixed(2)}
              </Grid>
            </Grid>

            <Grid container item xs={12}>
              <Grid item xs={3}>
                EPS:
              </Grid>
              <Grid item xs={3}>
                ${ttmEPS}
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </>
    );
  }
  return null;
};

export default GraphStats;
