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

  /* 
    State lifted up from ExploreList; handleClick is passed down to 
    Explore => ExploreList to the onClick
  */
  const handleClick = e => {
    const value = e.currentTarget.firstElementChild.textContent;
    setCompany(value);
    console.log(company);
  };

  const renderStock = () => {
    if (company !== '') {
      return <Stock />;
    }
    return <Explore handleClick={handleClick} />;
  };

  return (
    <Container>
      <StockProvider value={company}>
        <Search getCompany={getCompany} />
        {renderStock()}
      </StockProvider>
    </Container>
  );
}
