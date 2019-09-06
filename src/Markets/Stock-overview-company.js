import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class Company extends Component {
  state = {
    symbol: '',
    companyName: '',
    exchange: '',
    sector: '',
    industry: '',
    website: '',
    description: '',
    ceo: ''
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://financialmodelingprep.com/api/v3/company/profile/AAPL`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      this.setState({
        symbol: data.symbol,
        companyName: data.profile.companyName,
        exchange: data.profile.exchange,
        sector: data.profile.sector,
        industry: data.profile.industry,
        website: data.profile.website,
        description: data.profile.description,
        ceo: data.profile.ceo
      });
    };
  }

  render() {
    const {
      symbol,
      exchange,
      companyName,
      website,
      sector,
      industry,
      description,
      ceo
    } = this.state;

    return (
      <Paper>
        <h2>Company Info</h2>
        <Grid container direction="column">
          <Grid item>
            Company:
            {companyName}
          </Grid>
          <Grid item>CEO: {ceo}</Grid>
          <Grid item>
            Sector:
            {sector}
          </Grid>
          <Grid item>
            Industry:
            {industry}
          </Grid>
          <Grid item>{description}</Grid>
          <Grid item>Exchange: {exchange}</Grid>
          <Grid item>Ticker: {symbol}</Grid>
          <Grid item>
            Website:
            {website}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Company;
