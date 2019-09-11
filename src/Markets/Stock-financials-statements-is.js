import React, { useContext, useState, useEffect, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';
import StockContext from './StockContext.js';

const IS = props => {
  const { index } = props;
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = [
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    },
    {
      rev: '',
      costOfRev: '',
      gp: '',
      gm: '',
      opEx: '',
      opIncome: '',
      ni: '',
      npm: ''
    }
  ];

  const [income, setIncome] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/income-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const is = [];
        for (let i = 0; i < info.length; i++) {
          is[i] = {};
          is[i].rev = info[i]['Revenue'];
          is[i].costOfRev = info[i]['Cost of Revenue'];
          is[i].gp = info[i]['Gross Profit'];
          is[i].gm = info[i]['Gross Margin'];
          is[i].opEx = info[i]['Operating Expenses'];
          is[i].opIncome = info[i]['Operating Income'];
          is[i].ni = info[i]['Net Income'];
          is[i].npm = info[i]['Net Profit Margin'];
        }
        // check if mounted
        if (mounted.current) {
          setIncome(is);
        }
      })
      .catch(error => alert(`Error: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (income[index]) {
    const { rev, costOfRev, gp, gm, opEx, opIncome, ni, npm } = income[index];
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item>
            <h2>Income Statement </h2>
          </Grid>
          <Grid item>Revenue: $ {rev}</Grid>
          <Grid item>Cost of Revenue: $ {costOfRev}</Grid>
          <Grid item>Gross Profit: $ {gp}</Grid>
          <Grid item>Gross Margin: {gm * 100} %</Grid>
          <Grid item>Operating Expenses: $ {opEx}</Grid>
          <Grid item>Operating Income: $ {opIncome}</Grid>
          <Grid item>Net Income: $ {ni}</Grid>
          <Grid item>Net Profit Margin: {npm * 100} %</Grid>
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

export default IS;
