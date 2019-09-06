import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class BS extends Component {
  state = {
    bs: [
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
    ]
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/AAPL?period=quarter`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText).financials;
      const info = data.slice(0, 4);
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
      this.setState({ bs });
    };
  }

  render() {
    const {
      cash,
      currAssets,
      assets,
      currLib,
      lib,
      shareholdersEq
    } = this.state.bs[0];

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
}

export default BS;
