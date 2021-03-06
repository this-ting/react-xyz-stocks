import React from 'react';
import { Paper, Tabs, Tab, Typography, Box } from '@material-ui/core';

// import components
import IS from './Financials-is';
import BS from './Financials-bs';
import CFS from './Financials-cfs';

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

const Financials = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="2019Q3" {...a11yProps(0)} />
        <Tab label="2019Q2" {...a11yProps(1)} />
        <Tab label="2019Q1" {...a11yProps(2)} />
        <Tab label="2018Q4" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={value}>
        <IS index={value} />
        <br />
        <BS index={value} />
        <br />
        <CFS index={value} />
        <br />
      </TabPanel>
    </Paper>
  );
};

export default Financials;
