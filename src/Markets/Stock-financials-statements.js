import React from 'react';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';

// Import Components
import IS from './Stock-financials-statements-is.js';
import BS from './Stock-financials-statements-bs.js';
import CFS from './Stock-financials-statements-cfs.js';

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

function Statements() {
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

      <TabPanel value={value} index={0}>
        <IS index={0} />
        <BS index={0} />
        <CFS index={0} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IS index={1} />
        <BS index={1} />
        <CFS index={1} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <IS index={2} />
        <BS index={2} />
        <CFS index={2} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <IS index={3} />
        <BS index={3} />
        <CFS index={3} />
      </TabPanel>
    </Paper>
  );
}

export default Statements;
