import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class IS extends Component {
  state = {
    is: [
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
    ]
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL?period=quarter`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText).financials;
      const info = data.slice(0, 4);
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
      this.setState({ is });
    };
  }

  render() {
    const {
      rev,
      costOfRev,
      gp,
      gm,
      opEx,
      opIncome,
      ni,
      npm
    } = this.state.is[0];

    return (
      <Paper>
        <Grid container direction="column">
          <Grid item>
            <h2>Income Statement </h2>
          </Grid>
          <Grid item>Revenue: $ {rev}</Grid>
          <Grid item>Cost of Revenue: $ {costOfRev}</Grid>
          <Grid item>Gross Profit: $ {gp}</Grid>
          <Grid item>Gross Margin: $ {gm}</Grid>
          <Grid item>Operating Expenses: $ {opEx}</Grid>
          <Grid item>Operating Income: $ {opIncome}</Grid>
          <Grid item>Net Income: $ {ni}</Grid>
          <Grid item>Net Profit Margin: $ {npm}</Grid>
        </Grid>
      </Paper>
    );
  }
}

export default IS;
