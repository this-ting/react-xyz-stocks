import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography } from '@material-ui/core';
import StockContext from '../StockContext.js';

const Ticker = ({ company }) => {
  if (company) {
    const { name, exchange, ticker } = company;
    return (
      <>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="overline">
          {exchange}: {ticker}
        </Typography>
      </>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default Ticker;
