import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
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

const PortfolioNews = ({ companies }) => {
  const classes = useStyles();
  const [news, setNews] = useState('');
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&apiKey=c7fbbb0c2c28409eb961604990493a89`
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      })
      .catch(error => console.error(error));
  }, [companies]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        News Feed
      </Typography>

      {news
        ? news.map(news => {
            return (
              <>
                <Hidden smUp>
                  <Card className={classes.root}>
                    <a href={news.url} className={classes.link}>
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
                    <a href={news.url} className={classes.link}>
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
                                  <Typography
                                    variant="overline"
                                    color="textSecondary"
                                    component="span"
                                  >
                                    {news.source.name}
                                  </Typography>
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
        : null}
    </>
  );
};

export default PortfolioNews;
