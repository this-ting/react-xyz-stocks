import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

// Import Components
import IS from './Stock-financials-statements-is.js';
import BS from './Stock-financials-statements-bs.js';
import CFS from './Stock-financials-statements-cfs.js';

class Statements extends Component {
  state = {};

  render() {
    return (
      <Paper>
        <h2>Quarterly Financials</h2>
        <IS />
        <BS />
        <CFS />
      </Paper>
    );
  }
}

export default Statements;
