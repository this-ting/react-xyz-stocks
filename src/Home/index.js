import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Hidden,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import Search from '../Search';

const useStyles = makeStyles({
  banner1: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  },
  bannertext1: {
    paddingTop: '35vh',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem'
    }
  },
  bannerSubtext1: {
    paddingTop: '1rem',
    '@media (max-width: 600px)': {
      fontSize: '1rem'
    }
  },
  banner2: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh'
  },
  bannertext2: {
    paddingTop: '10vh'
  },
  bannerText2: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '20%'
  },
  banner3: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1494200483035-db7bc6aa5739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    textAlign: 'center'
  },
  bannerText3: {
    fontSize: '5rem',
    fontWeight: '600',
    color: '#616161',
    margin: 'auto',
    paddingTop: '25vh'
  },
  banner4: {
    height: '100vh',
    backgroundImage: `url(${'https://images.unsplash.com/photo-1494185728463-86366f396213?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  bannertext4: {
    padding: '2rem',
    paddingTop: '8rem',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
      paddingTop: '3rem'
    }
  },
  news: {
    overflow: 'auto',
    height: '65vh',
    padding: '0 2rem',
    '@media (max-width: 600px)': {
      height: '72vh',
      padding: '0 1rem'
    }
  },
  card: {
    maxWidth: 600,
    margin: '2rem 0'
  },
  root2: {
    // maxWidth: 980,
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
  },

  button: {
    marginTop: '2em'
  },
  search: {
    maxWidth: '980px',
    margin: 'auto',
    width: '100%',
    '@media (max-width: 600px)': {
      width: '90%'
    }
  },
  stockCard: {
    // maxWidth: '200px',
    margin: '1rem 0',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  plus: {
    color: '#4F9E59'
  },
  minus: {
    color: '#D3483A'
  }
});

const Banner1 = ({ getCompany }) => {
  const classes = useStyles();

  return (
    <Box className={classes.banner1}>
      <Container>
        <Typography
          gutterBottom
          variant="h2"
          color="textSecondary"
          align="center"
          className={classes.bannertext1}
        >
          Search NASDAQ & NYSE Stocks
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            align="center"
            className={classes.bannerSubtext1}
          >
            Learn about companies you love, easy like XYZ
          </Typography>
        </Typography>
        <br />
        <Paper className={classes.search}>
          <Container>
            <Search getCompany={getCompany} />
          </Container>
        </Paper>
      </Container>
    </Box>
  );
};

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
      <Box className={classes.banner4}>
        <Container>
          <Typography
            variant="h2"
            color="textSecondary"
            align="left"
            className={classes.bannertext4}
          >
            Latest Headlines
          </Typography>
          <Paper className={classes.news}>{newsAPICards}</Paper>
        </Container>
      </Box>
    </>
  );
};

const StockBanner = ({ getCompany }) => {
  const classes = useStyles();
  const [actives, setActives] = useState('');
  useEffect(() => {
    fetch(
      `https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&displayPercent=true&token=pk_0c6bc8f3cc794020a71b34f4fda09669&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
    )
      .then(response => response.json())
      .then(data => {
        setActives(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCompanyClick = e => {
    const input = e.currentTarget.attributes.ticker.value;
    getCompany(input);
  };

  const renderPriceColor = (price, percent) => {
    if (percent > 0) {
      return (
        <Typography variant="body2" component="p" className={classes.plus}>
          {price} ({percent} %)
          <br />
        </Typography>
      );
    }
    if (percent < 0) {
      return (
        <Typography variant="body2" component="p" className={classes.minus}>
          {price} ({percent} %)
          <br />
        </Typography>
      );
    }
  };

  const renderActives = actives
    ? actives.map(active => {
        return (
          <>
            <Card
              className={classes.stockCard}
              {...{ ticker: active.symbol }}
              onClick={handleCompanyClick}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Most Active
                </Typography>
                <Typography variant="h5" component="h2">
                  {active.companyName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {active.primaryExchange} :{active.symbol}
                </Typography>
                <Typography variant="body2" component="p">
                  {renderPriceColor(active.latestPrice, active.changePercent)}
                  {/* {active.latestPrice} ({active.changePercent} %) */}
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      })
    : null;

  const [gainers, setGainer] = useState('');
  useEffect(() => {
    fetch(
      `https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=gainers&displayPercent=true&token=pk_0c6bc8f3cc794020a71b34f4fda09669&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
    )
      .then(response => response.json())
      .then(data => {
        setGainer(data);
      })
      .catch(error => console.error(error));
  }, []);

  const renderGainers = gainers
    ? gainers.map(gainer => {
        return (
          <>
            <Card
              className={classes.stockCard}
              {...{ ticker: gainer.symbol }}
              onClick={handleCompanyClick}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Gainers
                </Typography>
                <Typography variant="h5" component="h2">
                  {gainer.companyName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {gainer.primaryExchange} :{gainer.symbol}
                </Typography>
                <Typography variant="body2" component="p">
                  {renderPriceColor(gainer.latestPrice, gainer.changePercent)}
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      })
    : null;

  return (
    <Box className={classes.banner3}>
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.bannertext4}
      >
        Featured Stocks
      </Typography>
      <Container className={classes.news}>
        <Hidden xsDown>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              {renderActives}
            </Grid>
            <Grid item xs={6}>
              {renderGainers}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderActives}
            </Grid>
            <Grid item xs={12}>
              {renderGainers}
            </Grid>
          </Grid>
        </Hidden>
      </Container>

      {/* <Paper className={classes.news}>{renderFeatured}</Paper> */}
    </Box>
  );
};

const Banner3 = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.banner2}>
        <Typography
          variant="h2"
          color="textSecondary"
          align="center"
          className={classes.bannertext2}
        >
          NASDAQ & NYSE STOCKS
          <Typography variant="body1" color="textSecondary" align="center">
            Learn more about companies you love to help build your perfect
            portfolio.
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

const Home = ({ getCompany, company }) => {
  if (company !== '') {
    return <Redirect to="/stock/" />;
  }

  return (
    <Box>
      <Banner1 getCompany={getCompany} />
      <StockBanner getCompany={getCompany} />
      {/* <Banner3 /> */}
      <NewsBanner />
    </Box>
  );
};

export default Home;
