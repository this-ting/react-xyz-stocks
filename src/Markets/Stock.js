import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';

// Import Components
import Overview from './Stock-overview.js';

export default function Stock() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <h1>Stock PAGE</h1>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Overview" />
        <Tab label="Financials" />
        <Tab label="News" />
      </Tabs>
      <h2>Chart</h2>
      <h2>Latest Quote</h2>
    </div>
  );
}
