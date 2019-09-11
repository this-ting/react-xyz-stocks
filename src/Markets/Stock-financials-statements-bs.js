import React, { useContext, useState, useEffect, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';
import StockContext from './StockContext.js';

const BS = props => {
  const { index } = props;
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = [
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    },
    {
      cash: '',
      currAssets: '',
      assets: '',
      currLib: '',
      lib: '',
      shareholdersEq: ''
    }
  ];

  const [balance, setBalance] = useState(initialState);
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const bs = [];
        for (let i = 0; i < info.length; i++) {
          bs[i] = {};
          bs[i].cash = info[i]['Cash and cash equivalents'];
          bs[i].currAssets = info[i]['Total current assets'];
          bs[i].assets = info[i]['Total assets'];
          bs[i].currLib = info[i]['Total current liabilities'];
          bs[i].lib = info[i]['Total liabilities'];
          bs[i].shareholdersEq = info[i]['Total shareholders equity'];
        }
        if (mounted.current) {
          setBalance(bs);
        }
      })
      .catch(error => alert(error));
    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (balance[index]) {
    const { cash, currAssets, assets, currLib, lib, shareholdersEq } = balance[
      index
    ];
    return (
      <Paper>
        <Grid container direction="column">
          <Grid item>
            <h2>Balance Statement </h2>
          </Grid>
          <Grid item>Cash and cash equivalents: $ {cash}</Grid>
          <Grid item>Total current assets: $ {currAssets}</Grid>
          <Grid item>Total assets: $ {assets}</Grid>
          <Grid item>Total current liabilities: $ {currLib}</Grid>
          <Grid item>Total liabilities: $ {lib}</Grid>
          <Grid item>Total shareholders equity: $ {shareholdersEq}</Grid>
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

export default BS;
