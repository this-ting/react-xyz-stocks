import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';

import StockContext from './StockContext.js';

const GraphStats = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  // market cap
  const [marketcap, setMarketCap] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/marketcap?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setMarketCap(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // week 52 high
  const [week52high, setWeek52High] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/week52high?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setWeek52High(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // week 52 low
  const [week52low, setWeek52Low] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/week52low?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setWeek52Low(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // ttmEPS
  const [ttmEPS, setTtmEPS] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/ttmEPS?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setTtmEPS(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // dividendYield
  const [dividendYield, setDividendYield] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/dividendYield?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setDividendYield(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // PE ratio
  const [peRatio, setPEratio] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/peRatio?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setPEratio(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // beta
  const [beta, setBeta] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/stats/beta?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setBeta(data);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
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
