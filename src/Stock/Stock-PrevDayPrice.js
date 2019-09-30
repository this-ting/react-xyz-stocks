import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

import StockContext from '../StockContext.js';

// returns the the same values as historical prices, can change over to historical prices when doing charts

const PrevDayPrice = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  // const initalState = {
  //   date: '',
  //   open: '',
  //   close: '',
  //   high: '',
  //   low: '',
  //   volume: '',
  //   changePercent: ''
  // };

  const [prevDay, setPrevDay] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/previous?filter=date,open,close,high,low,volume,changePercent,change&token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.date = data.date;
        info.open = data.open;
        info.close = data.close;
        info.high = data.high;
        info.low = data.low;
        info.volume = data.volume;
        info.changePercent = data.changePercent.toFixed(4);
        info.change = data.change.toFixed(2);
        if (mounted.current) {
          setPrevDay(info);
        }
      })
      .catch(error => alert(error));

    // Cleanup component
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (prevDay) {
    const {
      date,
      open,
      close,
      high,
      low,
      volume,
      changePercent,
      change
    } = prevDay;

    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4">{close}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">USD</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="secondary">
              {change} ({changePercent * 100}%)
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid item> As of closing date: {date}</Grid>
          {/* <Grid item> Open: {open}</Grid>
          <Grid item> Close: {close}</Grid>
          <Grid item> High: {high}</Grid>
          <Grid item> Low: {low}</Grid>
          <Grid item> Volume: {volume}</Grid> */}
        </Grid>
      </>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default PrevDayPrice;
