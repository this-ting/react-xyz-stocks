import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab, Typography, Box, Container } from '@material-ui/core';

// Import Components
import Ticker from './Stock-ticker.js';
import GraphContainer from './Stock-graph-container.js';
import Overview from './Stock-overview.js';
import Financials from './Stock-financials.js';
import News from './Stock-news.js';

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

export default function Stock() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <Ticker />
      <GraphContainer />

      <Tabs
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
}
