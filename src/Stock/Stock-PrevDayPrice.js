import React, { useState, useEffect, useContext, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import StockContext from '../StockContext.js';

// returns the the same values as historical prices, can change over to historical prices when doing charts

const PrevDayPrice = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [prevDay, setPrevDay] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/previous?filter=date,open,close,high,low,volume,changePercent,change&token=Tpk_7190efa09280470180ab8bb6635da780`
      // `https://cloud.iexapis.com/stable/stock/${input}/previous?filter=date,open,close,high,low,volume,changePercent,change&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
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
      .catch(error => console.error(`PrevDay component error: ${error}`));

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
      <Skeleton variant="rect" width="40%" height={30} />
    </>
  );
};

export default PrevDayPrice;
