import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Search from './Search.js';
import Explore from './Explore.js';
import Stock from './Stock.js';

class Markets extends Component {
  render() {
    return (
      <Container>
        <Search />
        <Explore />
        <Stock />
      </Container>
    );
  }
}

export default Markets;
