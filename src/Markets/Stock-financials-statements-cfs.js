import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class CFS extends Component {
  state = {
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

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/AAPL?period=quarter`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText).financials;
      const info = data.slice(0, 4);
      const cfs = [];
      for (let i = 0; i < info.length; i++) {
        cfs[i] = {};
        cfs[i].opCF = info[i]['Operating Cash Flow'];
        cfs[i].invCF = info[i]['Investing Cash flow:'];
        cfs[i].finCF = info[i]['Financing Cash Flow'];
        cfs[i].netCF = info[i]['Net cash flow / Change in cash'];
        cfs[i].freeCF = info[i]['Free Cash Flow'];
      }
      this.setState({ cfs });
    };
  }

  render() {
    const { opCF, invCF, finCF, netCF, freeCF } = this.state.cfs[0];

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
}

export default CFS;
