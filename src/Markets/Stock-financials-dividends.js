import React, { useContext, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import stockContext from './StockContext.js';

const Dividends = () => {
  // context
  const input = useContext(stockContext);

  const initialState = {
    exDate: '',
    paymentDate: '',
    recordDate: '',
    declaredDate: '',
    amount: '',
    type: '',
    frequency: '',
    currency: ''
  };

  const [div, setDiv] = useState(initialState);
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/dividends?token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.exDate = data[0].exDate;
        info.paymentDate = data[0].paymentDate;
        info.recordDate = data[0].recordDate;
        info.declaredDate = data[0].declaredDate;
        info.amount = data[0].amount;
        info.type = data[0].flag;
        info.frequency = data[0].frequency;
        info.currency = data[0].currency;
        setDiv(info);
      });
  }, [input]);

  if (div) {
    const {
      exDate,
      paymentDate,
      recordDate,
      declaredDate,
      amount,
      type,
      frequency,
      currency
    } = div;

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
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Dividends;
