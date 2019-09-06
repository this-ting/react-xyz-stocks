import React, { useState } from 'react';
import { Container } from '@material-ui/core';

// Import Component
import { StockProvider } from './StockContext.js';
import Search from './Search.js';
import Explore from './Explore.js';
import Stock from './Stock.js';

export default function Markets() {
  const [company, setCompany] = useState('');

  const getCompany = input => {
    setCompany(input);
  };

  return (
    <Container>
      <StockProvider value={company}>
        <Search getCompany={getCompany} />
        <Explore />
        <Stock />
      </StockProvider>
    </Container>
  );
}
