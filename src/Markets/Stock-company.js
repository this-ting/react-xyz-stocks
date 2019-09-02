import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

class Company extends Component {
  state = {
    symbol: '',
    companyName: '',
    exchange: '',
    industry: '',
    website: '',
    description: '',
    CEO: ''
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/company?token=Tpk_7190efa09280470180ab8bb6635da780`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      console.log(data);
      this.setState({
        symbol: data.symbol,
        companyName: data.companyName,
        exchange: data.exchange,
        industry: data.industry,
        website: data.website,
        description: data.description,
        CEO: data.CEO
      });
    };
  }

  render() {
    return (
      <Paper>
        <h2>Company Info</h2>
        <Grid container direction="column">
          <Grid item>
            {this.state.exchange}:{this.state.symbol}
          </Grid>
          <Grid item>
            Company:
            {this.state.companyName}
          </Grid>
          <Grid item>
            Website:
            {this.state.website}
          </Grid>
          <Grid item>
            Industry:
            {this.state.industry}
          </Grid>
          <Grid item>
            About:
            {this.state.description}
          </Grid>
          <Grid item>CEO: {this.state.CEO}</Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Company;
