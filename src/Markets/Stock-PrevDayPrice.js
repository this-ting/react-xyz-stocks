import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

// returns the the same values as historical prices, can change over to historical prices when doing charts

class PrevDayPrice extends Component {
  state = {
    date: '',
    open: null,
    close: 212.59,
    high: 214.58,
    low: 210.9,
    volume: 21958044,
    uOpen: 211.94,
    uClose: 217.34,
    uHigh: 220.01,
    uLow: 215.7,
    uVolume: 21166047,
    change: -0.27,
    changePercent: -0.1348,
    changeOverTime: 0,
    symbol: 'AAPL'
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/previous?token=Tpk_7190efa09280470180ab8bb6635da780`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      console.log(data);
      this.setState({
        date: data.date,
        open: data.open,
        close: data.close,
        high: data.high,
        low: data.low,
        volume: data.volume,
        uOpen: data.uOpen,
        uClose: data.uClose,
        uHigh: data.uHigh,
        uLow: data.uLow,
        uVolume: data.uVolume,
        change: data.change,
        changePercent: data.changePercent,
        changeOverTime: data.changeOverTime,
        symbol: data.symbol
      });
    };
  }

  render() {
    let { date, open, close, high, low, volume, changePercent } = this.state;
    return (
      <Paper>
        <h2>Previous Day Price</h2>
        <Grid container direction="column">
          <Grid item> Date: {date}</Grid>
          <Grid item> Open: {open}</Grid>
          <Grid item> Close: {close}</Grid>
          <Grid item> High: {high}</Grid>
          <Grid item> Low: {low}</Grid>
          <Grid item> Volume: {volume}</Grid>
          <Grid item> ChangePercent: {changePercent}</Grid>
        </Grid>
      </Paper>
    );
  }
}

export default PrevDayPrice;
