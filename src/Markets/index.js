import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Import Component
import { StockProvider } from './StockContext.js';
import Search from './Search.js';
import Explore from './Explore.js';
import Stock from './Stock.js';
// import AddInfo from './Explore-addInfo.js';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px'
  }
});

const Markets = ({ company, getCompany, handleClick }) => {
  const classes = useStyles();

  // const [company, setCompany] = useState('');

  // const getCompany = input => {
  //   setCompany(input);
  // };

  // /*
  //   State lifted up from SectorList; handleClick is passed down to
  //   Explore => SectorList to the onClick
  // */
  // const handleClick = e => {
  //   const value = e.currentTarget.firstElementChild.textContent;
  //   setCompany(value);
  // };

  const renderStock = () => {
    if (company !== '') {
      return <Stock />;
    }
    return <Explore handleClick={handleClick} />;
  };

  return (
    <Container className={classes.root}>
      {/* <AddInfo /> */}
      {/* <StockProvider value={company}> */}
      <Search getCompany={getCompany} />
      {renderStock()}
      {/* </StockProvider> */}
    </Container>
  );
};

export default Markets;
