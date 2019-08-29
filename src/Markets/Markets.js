import React, { Component } from 'react';
import Explore from './Explore.js';
import Stock from './Stock.js';

class Markets extends Component {
  render() {
    return (
      <div>
        <h2>Markets PAGE</h2>
        <Explore />
        <Stock />
      </div>
    );
  }
}

export default Markets;
