import React from 'react';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';

// Import Components
import IS from './Stock-financials-is.js';
import BS from './Stock-financials-bs.js';
import CFS from './Stock-financials-cfs.js';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`financials-tabpanel-${index}`}
      aria-labelledby={`financials-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

function a11yProps(index) {
  return {
    id: `financials-tab-${index}`,
    'aria-controls': `financials-tabpanel-${index}`
  };
}

function Financials() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper>
      <h2>Quarterly Financials</h2>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="2019Q3" {...a11yProps(0)} />
        <Tab label="2019Q2" {...a11yProps(1)} />
        <Tab label="2019Q1" {...a11yProps(2)} />
        <Tab label="2018Q4" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={value}>
        <IS index={value} />
        <BS index={value} />
        <CFS index={value} />
      </TabPanel>
    </Paper>
  );
}

export default Financials;
