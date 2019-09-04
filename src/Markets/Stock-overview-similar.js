import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

class Similar extends Component {
  state = {
    similar: []
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/peers?token=Tpk_7190efa09280470180ab8bb6635da780`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      this.setState({
        similar: data
      });
    };
  }

  render() {
    let showSimilar = this.state.similar.map(similar => (
      <Grid item>{similar}</Grid>
    ));

    return (
      <Paper>
        <h2>Company Info</h2>
        <Grid container direction="column">
          {showSimilar}
        </Grid>
      </Paper>
    );
  }
}

export default Similar;
