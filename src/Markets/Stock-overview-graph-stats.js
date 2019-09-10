import React, { useState, useEffect, useContext } from 'react';
import { Paper, Grid } from '@material-ui/core';

import StockContext from './StockContext.js';

const GraphStats = () => {
  // context
  const input = useContext(StockContext);

  // market cap
  const [marketcap, setMarketCap] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/marketcap?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setMarketCap(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // week 52 high
  const [week52high, setWeek52High] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/week52high?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setWeek52High(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // week 52 low
  const [week52low, setWeek52Low] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/week52low?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setWeek52Low(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // ttmEPS
  const [ttmEPS, setTtmEPS] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/ttmEPS?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setTtmEPS(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // dividendYield
  const [dividendYield, setDividendYield] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/dividendYield?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setDividendYield(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // PE ratio
  const [peRatio, setPEratio] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/peRatio?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setPEratio(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  // beta
  const [beta, setBeta] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/beta?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        setBeta(data);
      });
    // .catch(error => alert(error));
  }, [input]);

  return (
    <Paper>
      <h2>Graph Stats</h2>
      <Grid container direction="column">
        <Grid item>Market Cap: {marketcap}</Grid>
        <Grid item>EPS: ${ttmEPS}</Grid>
        <Grid item>Beta: {beta}</Grid>
        <Grid item>P/E ratio: {peRatio}</Grid>
        <Grid item>Div Yield: {dividendYield}</Grid>
        <Grid item>52-week Low: {week52low}</Grid>
        <Grid item>52-week High: {week52high}</Grid>
      </Grid>
    </Paper>
  );
};

export default GraphStats;
