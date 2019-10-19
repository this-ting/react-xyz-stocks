import React, { useContext, useState, useEffect, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';

// import components
import stockContext from '../StockContext.js';

const Dividends = () => {
  // context
  const input = useContext(stockContext);

  // check for component mount
  const mounted = useRef(false);

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
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/dividends?token=Tpk_7190efa09280470180ab8bb6635da780`
      // `https://cloud.iexapis.com/stable/stock/${input}/dividends?token=pk_0c6bc8f3cc794020a71b34f4fda09669`
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
        if (mounted.current) {
          setDiv(info);
        }
      });

    return () => {
      mounted.current = false;
    };
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
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default Dividends;
