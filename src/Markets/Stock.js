import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';

// Import Components
import Ticker from './Stock-ticker.js';
import Overview from './Stock-overview.js';

export default function Stock() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <Ticker />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Overview" />
        <Tab label="Financials" />
        <Tab label="News" />
      </Tabs>

      <Overview />
    </div>
  );
}
