import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

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
      `https://financialmodelingprep.com/api/v3/company/profile/AAPL`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      this.setState({
        symbol: data.symbol,
        companyName: data.profile.companyName,
        exchange: data.profile.exchange,
        industry: data.profile.industry,
        website: data.profile.website,
        description: data.profile.description,
        CEO: data.profile.ceo
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
