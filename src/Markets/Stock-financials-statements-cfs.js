import React, { useContext, useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import StockContext from './StockContext.js';

const CFS = () => {
  // context
  const input = useContext(StockContext);

  const initialState = {
    cfs: [
      {
        opCF: '',
        invCF: '',
        finCF: '',
        netCF: '',
        freeCF: ''
      },
      {
        opCF: '',
        invCF: '',
        finCF: '',
        netCF: '',
        freeCF: ''
      },
      {
        opCF: '',
        invCF: '',
        finCF: '',
        netCF: '',
        freeCF: ''
      },
      {
        opCF: '',
        invCF: '',
        finCF: '',
        netCF: '',
        freeCF: ''
      }
    ]
  };

  const [cashFlow, setCashFlow] = useState(initialState);
  useEffect(() => {
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const cfs = [];
        for (let i = 0; i < info.length; i++) {
          cfs[i] = {};
          cfs[i].opCF = info[i]['Operating Cash Flow'];
          cfs[i].invCF = info[i]['Investing Cash flow'];
          cfs[i].finCF = info[i]['Financing Cash Flow'];
          cfs[i].netCF = info[i]['Net cash flow / Change in cash'];
          cfs[i].freeCF = info[i]['Free Cash Flow'];
        }
        setCashFlow(cfs);
      })
      .catch(error => alert(error));
  }, [input]);

  // if undefined, means data not rendered yet
  if (cashFlow[0]) {
    const { opCF, invCF, finCF, netCF, freeCF } = cashFlow[0];
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item>
            <h2>Cash Flow Statement </h2>
          </Grid>
          <Grid item>Operating Cash Flow: $ {opCF}</Grid>
          <Grid item>Investing Cash flow: $ {invCF}</Grid>
          <Grid item>Financing Cash Flow: $ {finCF}</Grid>
          <Grid item>Net cash flow / Change in cash: $ {netCF}</Grid>
          <Grid item>Free Cash Flow: $ {freeCF}</Grid>
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

export default CFS;
