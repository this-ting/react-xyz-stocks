import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

// Import Components
import IS from './Stock-financials-statements-is.js';
import BS from './Stock-financials-statements-bs.js';
import CFS from './Stock-financials-statements-cfs.js';

function Statements() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper>
      <h2>Quarterly Financials</h2>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="2019Q3" />
        <Tab label="2019Q2" />
        <Tab label="2019Q1" />
        <Tab label="2018Q4" />
      </Tabs>
      <IS />
      <BS />
      <CFS />
    </Paper>
  );
}

export default Statements;
