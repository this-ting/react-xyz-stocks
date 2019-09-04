import React, { Component } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';

class News extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.open(
      'get',
      `https://sandbox.iexapis.com/stable/stock/aapl/news/last/3?token=Tpk_7190efa09280470180ab8bb6635da780`
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
    let { news } = this.state;
    let articles = news.map(n => (
      <Paper>
        <Grid container direction="row">
          <Grid container direction="column" xs={9}>
            <Grid item>
              <Typography varitant="h6" gutterBottom="true">
                <a href={n.url}>{n.headline}</a>
              </Typography>
            </Grid>
            <Grid item>
              <Typography varitant="overline" color="textSecondary">
                {n.source} - {n.datetime}
              </Typography>
            </Grid>
          </Grid>
          <Grid container align="right" xs={3}>
            <img
              src={n.image}
              style={({ height: '150px' }, { width: '150px' })}
              alt="news article"
            />
          </Grid>
        </Grid>
      </Paper>
    ));

    let testArticle = (
      <Paper>
        <Grid container direction="row">
          <Grid container direction="column" xs={9}>
            <Grid item>
              <Typography varitant="h6" gutterBottom="true">
                <a href="https://cloud.iexapis.com/v1/news/article/8aceb77d-cde7-4ffa-9e66-7253cc6b8789">
                  The latest Apple AirPods are down to their lowest price ever
                </a>
              </Typography>
            </Grid>
            <Grid item>
              <Typography varitant="overline" color="textSecondary">
                USA Today Tue, 03 Sep 2019 21:08:32 GMT
              </Typography>
            </Grid>
          </Grid>
          <Grid container align="right" xs={3}>
            <img
              src="https://cloud.iexapis.com/v1/news/image/8aceb77d-cde7-4ffa-9e66-7253cc6b8789"
              style={({ height: '150px' }, { width: '150px' })}
              alt="news article"
            />
          </Grid>
        </Grid>
      </Paper>
    );

    return (
      <Paper>
        <h2>News about</h2>
        <Grid container direction="column">
          {testArticle}
          {articles}
        </Grid>
      </Paper>
    );
  }
}

export default News;

/*
"datetime": 1567544912000,
"headline": "The latest Apple AirPods are down to their lowest price ever",
"source": "USA Today",
"url": "https://cloud.iexapis.com/v1/news/article/8aceb77d-cde7-4ffa-9e66-7253cc6b8789",
"summary": "A sale on Apple products is a pretty rare occurrence, which is why we were surprised to find that the latest AirPods have dipped to a new low price.",
"related": "AAPL",
"image": "https://cloud.iexapis.com/v1/news/image/8aceb77d-cde7-4ffa-9e66-7253cc6b8789",
"lang": "en",
"hasPaywall": false


let newDate = new Date(1567544912000)
newDate.toGMTString()
"Tue, 03 Sep 2019 21:08:32 GMT"
*/
