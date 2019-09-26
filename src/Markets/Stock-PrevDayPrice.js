import React, { useState, useEffect, useContext, useRef } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

import StockContext from './StockContext.js';

// returns the the same values as historical prices, can change over to historical prices when doing charts

const PrevDayPrice = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initalState = {
    date: '',
    open: '',
    close: '',
    high: '',
    low: '',
    volume: '',
    changePercent: ''
  };

  const [prevDay, setPrevDay] = useState(initalState);

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/previous?filter=date,open,close,high,low,volume,changePercent&token=Tpk_7190efa09280470180ab8bb6635da780`
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
        info.changePercent = data.changePercent;
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
    const { date, open, close, high, low, volume, changePercent } = prevDay;

    return (
      <>
        <Grid container>
          <Grid item>
            <Typography variant="h4">{close}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">USD</Typography>
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid item> Date: {date}</Grid>
          <Grid item> Open: {open}</Grid>
          <Grid item> Close: {close}</Grid>
          <Grid item> High: {high}</Grid>
          <Grid item> Low: {low}</Grid>
          <Grid item> Volume: {volume}</Grid>
          <Grid item> ChangePercent: {changePercent * 100}%</Grid>
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