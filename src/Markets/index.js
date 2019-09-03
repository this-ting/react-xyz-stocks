import React from 'react';
import { Container } from '@material-ui/core';
import Search from './Search.js';
import Explore from './Explore.js';
import Stock from './Stock.js';

export default function Markets() {
  return (
    <Container>
      <Search />
      <Explore />
      <Stock />
    </Container>
  );
}
