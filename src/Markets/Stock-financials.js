import React from 'react';

// Import Components
import Statements from './Stock-financials-statements.js';
import Dividends from './Stock-financials-dividends.js';

export default function Financials() {
  return (
    <>
      <Statements />
      <Dividends />
    </>
  );
}
