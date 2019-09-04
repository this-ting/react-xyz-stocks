import React, { Component } from 'react';
import { Paper, Grid } from '@material-ui/core';

// Import Components
import BS from './Stock-financials-statements-bs.js';

class Statements extends Component {
  state = {};

  render() {
    return (
      <Paper>
        <h2>Quarterly Financials</h2>
        <BS />
      </Paper>
    );
  }
}

export default Statements;
