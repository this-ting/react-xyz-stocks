import React, { useState, useEffect, useRef, useContext } from 'react';
import { Tabs, Tab, Typography, Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Import Components
import ErrorMessage from './Stock-errorMessage.js';
import Search from '../Search';
import Ticker from './Stock-ticker.js';
import PrevDayPrice from './Stock-PrevDayPrice.js';
import Overview from './Stock-overview.js';
import Financials from './Stock-financials.js';
import News from './Stock-news.js';
import AddButton from './Stock-addButton.js';
import StockContext from '../StockContext.js';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginTop: '11rem',
    maxWidth: '980px'
  },
  tabs: {
    paddingTop: '2rem'
  },
  tabHeader: {
    fontSize: '1.02rem',
    '@media (max-width: 600px)': {
      fontSize: '1rem'
    }
  },
  tab: {
    padding: 0
  }
});

const TabPanel = props => {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`stock-tabpanel-${index}`}
      aria-labelledby={`stock-tab-${index}`}
      {...other}
    >
      <Box p={3} className={classes.tab}>
        {children}
      </Box>
    </Typography>
  );
};

const a11yProps = index => {
  return {
    id: `stock-tab-${index}`,
    'aria-controls': `stock-tabpanel-${index}`
  };
};

const Stock = ({ getCompany }) => {
  const classes = useStyles();

  // check for component mount
  const mounted = useRef(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // context
  const input = useContext(StockContext);

  const [company, setCompany] = useState('');

  useEffect(() => {
    mounted.current = true;
    gtag('config', 'G-08LSHJHZVV', {
      page_title: 'Stock',
      page_path: '/stock'
    });

    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange&token=Tpk_7190efa09280470180ab8bb6635da780`
      // `https://cloud.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error(`Request rejected with status ${response.status}`);
      })
      .then(data => {
        const info = {};
        info.name = data.companyName;
        info.exchange = data.exchange;
        info.ticker = data.symbol;
        if (mounted.current) {
          setCompany(info);
        }
      })
      .catch(error => {
        console.error(`Stock component error: ${error}`);
        setCompany('error');
      });

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  const renderStock =
    company === 'error' ? (
      <ErrorMessage />
    ) : (
      <>
        <br />
        <Grid container justify="space-between" spacing={1}>
          <Grid item>
            <Ticker company={company} />
          </Grid>
          <Grid item>
            <AddButton company={company} />
          </Grid>
        </Grid>
        <PrevDayPrice />
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label="stock tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Quarterly Financials" {...a11yProps(1)} />
          <Tab label="News" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Overview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Financials />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <News />
        </TabPanel>
      </>
    );

  return (
    <Container className={classes.root}>
      <Search getCompany={getCompany} />
      {renderStock}
    </Container>
  );
};

export default Stock;
