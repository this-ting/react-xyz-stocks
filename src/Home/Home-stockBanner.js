import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Box,
  Typography,
  Hidden,
  Card,
  CardContent,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles({
  banner: {
    backgroundImage: `url(${'https://images.unsplash.com/photo-1494200483035-db7bc6aa5739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'})`,
    backgroundPostion: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    textAlign: 'center'
  },
  bannerText: {
    padding: '2rem',
    paddingTop: '8rem',
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
      paddingTop: '3rem'
    }
  },
  root: {
    overflow: 'auto',
    height: '65vh',
    padding: '0 2rem',
    '@media (max-width: 600px)': {
      height: '72vh',
      padding: '0 1rem'
    }
  },
  stockCard: {
    // maxWidth: '200px',
    margin: '1rem 0',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {
    fontSize: 14
  },
  plus: {
    color: '#4F9E59'
  },
  minus: {
    color: '#D3483A'
  },
  pos: {
    marginBottom: 12
  }
});

const StockBanner = ({ getCompany }) => {
  const classes = useStyles();
  const [actives, setActives] = useState('');
  useEffect(() => {
    fetch(
      `https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&displayPercent=true&token=Tpk_7190efa09280470180ab8bb6635da780&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
      // `https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&displayPercent=true&token=pk_0c6bc8f3cc794020a71b34f4fda09669&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
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
      `https://sandbox.iexapis.com/stable/stock/market/collection/list?collectionName=gainers&displayPercent=true&token=Tpk_7190efa09280470180ab8bb6635da780&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
      // `https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=gainers&displayPercent=true&token=pk_0c6bc8f3cc794020a71b34f4fda09669&filter=symbol,companyName,primaryExchange,latestPrice,changePercent`
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
    <Box className={classes.banner}>
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={classes.bannerText}
      >
        Featured Stocks
      </Typography>
      <Container className={classes.root}>
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
    </Box>
  );
};

export default StockBanner;
