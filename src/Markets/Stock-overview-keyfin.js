import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class KeyFin extends Component {
  state = {
    date: '',
    revenue: '',
    netIncome: '',
    netProfitMargin: '',
    eps: ''
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL?period=quarter`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText).financials[0];
      // console.log(data);
      const info = {
        date: data.date,
        revenue: data.Revenue,
        netIncome: data['Net Income'],
        netProfitMargin: data['Net Profit Margin'],
        eps: data.EPS
      };
      this.setState(info);
    };
  }

  render() {
    const { date, revenue, netIncome, netProfitMargin, eps } = this.state;

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
}

export default KeyFin;
