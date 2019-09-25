import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Import Components
import Ticker from './Stock-ticker.js';
import PrevDayPrice from './Stock-PrevDayPrice.js';
import Overview from './Stock-overview.js';
import Financials from './Stock-financials.js';
import News from './Stock-news.js';

const useStyles = makeStyles({
  root: {
    paddingTop: '2rem',
    paddingBottom: '2rem'
  },
  tabs: {
    paddingTop: '2rem'
  }
});

const TabPanel = props => {
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
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

function a11yProps(index) {
  return {
    id: `stock-tab-${index}`,
    'aria-controls': `stock-tabpanel-${index}`
  };
}

const Stock = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Container className={classes.root}>
      <Ticker />
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
    </Container>
  );
};

export default Stock;
