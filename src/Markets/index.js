import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Search from './Search.js';
import Explore from './Explore.js';
import Stock from './Stock.js';

export default function Markets() {
  const [company, setCompany] = useState('');

  const getCompany = unit => {
    setCompany(unit);
  };

  return (
    <Container>
      <Search getCompany={getCompany} />
      <Explore />
      <Stock />
    </Container>
  );
}
