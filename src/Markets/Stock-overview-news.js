import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

class News extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/news/last/?token=Tpk_7190efa09280470180ab8bb6635da780`
    );
    req.send();
    req.onload = () => {
      const data = JSON.parse(req.responseText);
      // console.log(data);
      this.setState({
        news: data
      });
    };
  }

  render() {
    return (
      <Paper>
        <h2>News about</h2>
        <Grid container direction="column"></Grid>
      </Paper>
    );
  }
}

export default News;
