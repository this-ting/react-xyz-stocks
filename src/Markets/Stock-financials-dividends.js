import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class Dividends extends Component {
  state = {
    exDate: '',
    paymentDate: '',
    recordDate: '',
    declaredDate: '',
    amount: '',
    type: '',
    frequency: '',
    currency: ''
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/dividends?token=Tpk_7190efa09280470180ab8bb6635da780`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      this.setState({
        exDate: data.exDate,
        paymentDate: data.paymentDate,
        recordDate: data.recordDate,
        declaredDate: data.declaredDate,
        amount: data.amount,
        type: data.flag,
        frequency: data.frequency,
        currency: data.currency
      });
    };
  }

  render() {
    const {
      exDate,
      paymentDate,
      recordDate,
      declaredDate,
      amount,
      type,
      frequency,
      currency
    } = this.state;
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item>
            <h2>Most Recent Dividends Declared</h2>
          </Grid>
          <Grid item>Type: {type}</Grid>
          <Grid item>
            Amount: {currency}${amount}
          </Grid>
          <Grid item>Ex-Dividend Date: {exDate}</Grid>
          <Grid item>Payment Date: {paymentDate}</Grid>
          <Grid item>Record Date: {recordDate}</Grid>
          <Grid item>Declared Date: {declaredDate}</Grid>
          <Grid item>Frequency: $ {frequency}</Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Dividends;
