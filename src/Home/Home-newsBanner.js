import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Box,
  Typography,
  Paper,
  Hidden,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles({
  banner: {
    height: '100vh',
    backgroundImage: `url(${'https://images.unsplash.com/photo-1494185728463-86366f396213?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  bannerText: {
    padding: '2rem',
    paddingTop: '8rem',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
      paddingTop: '3rem'
    }
  },
  paper: {
    overflow: 'auto',
    height: '65vh',
    padding: '0 2rem',
    '@media (max-width: 600px)': {
      height: '72vh',
      padding: '0 1rem'
    }
  },
  cardSM: {
    maxWidth: 600,
    margin: '2rem 0'
  },
  cardXS: {
    // maxWidth: 980,
    margin: '2rem 0'
  },
  mediaSM: {
    maxWidth: 580,
    height: 140
  },
  mediaXS: {
    maxWidth: 345,
    height: 170
  },
  link: {
    textDecoration: 'none'
  }
});

const NewsBanner = () => {
  const classes = useStyles();
  const [news, setNews] = useState('');
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=5&sources=the-washington-post,the-telegraph,the-new-york-times,the-globe-and-mail,reuters,financial-post,australian-financial-review,bloomberg,business-insider,cnbc,financial-post,fortune,the-wall-street-journal&apiKey=c7fbbb0c2c28409eb961604990493a89`
    )
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      })
      .catch(error => console.error(error));
  }, []);

  const newsAPICards = news
    ? news.map(news => {
        return (
          <>
            <Hidden smUp>
              <Card className={classes.cardSM}>
                <a
                  href={news.url}
                  className={classes.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CardActionArea>
                    <CardMedia
                      image={news.urlToImage}
                      className={classes.mediaSM}
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
              <Card className={classes.cardXS}>
                <a
                  href={news.url}
                  className={classes.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CardActionArea>
                    <Grid container wrap="wrap">
                      <Grid item sm={3}>
                        <CardMedia
                          image={news.urlToImage}
                          className={classes.mediaXS}
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
    : null;

  return (
    <>
      <Box className={classes.banner}>
        <Container>
          <Typography
            variant="h2"
            color="textSecondary"
            align="left"
            className={classes.bannerText}
          >
            Latest Headlines
          </Typography>
          <Paper className={classes.paper}>{newsAPICards}</Paper>
        </Container>
      </Box>
    </>
  );
};

export default NewsBanner;
