import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import StockContext from '../StockContext.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '1rem 0'
  },
  root2: {
    maxWidth: 980,
    margin: '0.5rem 0'
  },
  media: {
    maxWidth: 580,
    height: 140
  },
  media2: {
    maxWidth: 345,
    height: 170
  },
  header: {
    maxWidth: 345,
    height: 140
  },
  link: {
    textDecoration: 'none'
  }
});

const News = () => {
  const classes = useStyles();

  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [news, setNews] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://cloud.iexapis.com/stable/stock/${input}/news/last/5?filter=datetime,headline,source,url,image,related,summary&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
    )
      .then(response => response.json())
      .then(data => {
        if (mounted.current) {
          setNews(data);
        }
      })
      .catch(error => console.error(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (news) {
    const articles = news.map(n => (
      <>
        <Hidden smUp>
          <Card className={classes.root}>
            <a href={n.url} className={classes.link} target="_blank">
              <CardActionArea>
                <CardMedia image={n.image} className={classes.media} />
                <CardContent>
                  <Typography variant="h6" color="textSecondary" component="h6">
                    {n.headline}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {news.summary}
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                        component="span"
                      >
                        {n.source}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="overline"
                        color="textSecondary"
                        component="span"
                      >
                        {new Date(n.datetime).toGMTString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </a>
          </Card>
        </Hidden>

        <Hidden xsDown>
          <Card className={classes.root2}>
            <a href={n.url} className={classes.link} target="_blank">
              <CardActionArea>
                <Grid container wrap="wrap">
                  <Grid item sm={3}>
                    <CardMedia image={n.image} className={classes.media2} />
                  </Grid>
                  <Grid item sm={9}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="h6"
                      >
                        {n.headline}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Typography
                            variant="overline"
                            color="textSecondary"
                            component="span"
                          >
                            {n.source}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="overline"
                            color="textSecondary"
                            component="span"
                          >
                            {new Date(n.datetime).toGMTString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {n.summary}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </a>
          </Card>
        </Hidden>
      </>
    ));

    return <>{articles}</>;
  }

  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

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
