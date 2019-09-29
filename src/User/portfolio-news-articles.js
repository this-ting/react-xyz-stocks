import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Hidden,
  Tabs,
  Tab,
  Box,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '80vh'
  },
  card: {
    maxWidth: 600,
    margin: '2rem 0'
  },
  root2: {
    maxWidth: 980,
    margin: '2rem 0'
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

const NewsArticles = ({ value, companies }) => {
  const classes = useStyles();
  const [news, setNews] = useState('');
  useEffect(() => {
    const url = () => {
      if (value === 0) {
        return `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=5&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      } else if (value === 2) {
        `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      } else if (value === 3) {
        return `https://newsapi.org/v2/top-headlines?sources=the-washington-post,the-telegraph,the-new-york-times,the-globe-and-mail,reuters,financial-post,australian-financial-review,bloomberg,business-insider,cnbc,financial-post,fortune,the-wall-street-journal&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      } else if (value === 4) {
        return `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=5&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      } else if (value === 5) {
        return `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&pageSize=5&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      } else if (value === 6) {
        return `https://newsapi.org/v2/top-headlines?country=us&category=science&pageSize=5&apiKey=c7fbbb0c2c28409eb961604990493a89`;
      }
    };
    if (value === 1 && companies) {
      let newData = [];
      fetch(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${companies}&types=news&last=2&filter=datetime,headline,source,url,image,related,summary&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
      )
        .then(response => response.json())
        .then(data => {
          let loaded = 0;
          for (let i = 0; i < companies.length; i++) {
            let IEXarticles = data[companies[i]].news; // [{},{},{}]
            for (let a = 0; a < IEXarticles.length; a++) {
              newData.push(IEXarticles[a]);
            }
            newData.sort(n => n.datetime);
            loaded++;
            if (loaded >= companies.length) {
              console.log(newData);
              setNews(newData);
            }
          }
        })
        .catch(error => console.error(error));
    }

    if (value === 0 || value > 1) {
      fetch(url())
        .then(response => response.json())
        .then(data => {
          setNews(data.articles);
        })
        .catch(error => console.error(error));
    }
  }, [value]);

  const newsAPICards = news
    ? news.map(news => {
        return (
          <>
            <Hidden smUp>
              <Card className={classes.card}>
                <a href={news.url} className={classes.link} target="_blank">
                  <CardActionArea>
                    <CardMedia
                      image={news.urlToImage}
                      className={classes.media}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="h6"
                      >
                        {news.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {news.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </a>
              </Card>
            </Hidden>

            <Hidden xsDown>
              <Card className={classes.root2}>
                <a href={news.url} className={classes.link} target="_blank">
                  <CardActionArea>
                    <Grid container wrap="wrap">
                      <Grid item sm={3}>
                        <CardMedia
                          image={news.urlToImage}
                          className={classes.media2}
                        />
                      </Grid>
                      <Grid item sm={9}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            component="h6"
                          >
                            {news.title}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item>
                              {/* <Typography
                                variant="overline"
                                color="textSecondary"
                                component="span"
                              >
                                {news.source.name}
                              </Typography> */}
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="overline"
                                color="textSecondary"
                                component="span"
                              >
                                {news.publishedAt}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {news.description}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </a>
              </Card>
            </Hidden>
          </>
        );
      })
    : null;

  if (value === 0 || value > 1) {
    return <>{newsAPICards}</>;
  }
  if (value === 1 && companies) {
    return (
      <>
        {news
          ? news.map(news => {
              return (
                <>
                  <Hidden smUp>
                    <Card className={classes.card}>
                      <a
                        href={news.url}
                        className={classes.link}
                        target="_blank"
                      >
                        <CardActionArea>
                          <CardMedia
                            image={news.image}
                            className={classes.media}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              component="h6"
                            >
                              {news.headline}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {news.summary}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </a>
                    </Card>
                  </Hidden>

                  <Hidden xsDown>
                    <Card className={classes.root2}>
                      <a
                        href={news.url}
                        className={classes.link}
                        target="_blank"
                      >
                        <CardActionArea>
                          <Grid container wrap="wrap">
                            <Grid item sm={3}>
                              <CardMedia
                                image={news.image}
                                className={classes.media2}
                              />
                            </Grid>
                            <Grid item sm={9}>
                              <CardContent>
                                <Typography
                                  variant="h6"
                                  color="textSecondary"
                                  component="h6"
                                >
                                  {news.headline}
                                </Typography>
                                <Grid container spacing={2}>
                                  <Grid item>
                                    {/* <Typography
                                      variant="overline"
                                      color="textSecondary"
                                      component="span"
                                    >
                                      {news.source}
                                    </Typography> */}
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="overline"
                                      color="textSecondary"
                                      component="span"
                                    >
                                      {news.datetime}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {news.summary}
                                </Typography>
                              </CardContent>
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      </a>
                    </Card>
                  </Hidden>
                </>
              );
            })
          : null}
      </>
    );
  }

  if (value === 1 && companies === null) {
    return (
      <Typography variant="body1">
        Add companies to your Watchlist for a personalized news feed!
      </Typography>
    );
  }

  return null;
};

export default NewsArticles;
