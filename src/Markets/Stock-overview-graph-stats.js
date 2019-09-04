import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class GraphStats extends Component {
  state = {
    marketcap: '',
    week52high: '',
    week52low: '',
    ttmEPS: '',
    dividendYield: '',
    peRatio: '',
    beta: ''
  };

  componentDidMount() {
    // IEX API usage is cheaper if you GET a single value at a time, so set up a for loop to get only the values needed
    const stats = [
      'marketcap',
      'week52high',
      'week52low',
      'ttmEPS',
      'dividendYield',
      'peRatio',
      'beta'
    ];
    for (let i = 0; i < stats.length; i++) {
      let key = stats[i];
      const req = new XMLHttpRequest();
      req.open(
        'get',
        `https://sandbox.iexapis.com/stable/stock/aapl/stats/${key}?token=Tpk_7190efa09280470180ab8bb6635da780`
      );
      req.send();
      req.onload = () => {
        const data = JSON.parse(req.responseText);
        let stat = this.state;
        stat[key] = data;
        this.setState(stat);
      };
    }
  }

  render() {
    const {
      marketcap,
      ttmEPS,
      beta,
      peRatio,
      dividendYield,
      week52high,
      week52low
    } = this.state;

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
  }
}

export default GraphStats;
