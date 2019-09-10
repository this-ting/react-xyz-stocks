import React, { useState, useEffect, useContext, useRef } from 'react';
import StockContext from './StockContext.js';

const Ticker = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = {
    name: '',
    exchange: '',
    ticker: ''
  };

  const [company, setCompany] = useState(initialState);

  useEffect(() => {
    mounted.current = true;
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${input}`)
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.name = data.profile.companyName;
        info.exchange = data.profile.exchange;
        info.ticker = data.symbol;
        if (mounted.current) {
          setCompany(info);
        }
      })
      .catch(error => alert(error));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (company.name) {
    const { name, exchange, ticker } = company;
    return (
      <>
        <h1>{name}</h1>
        <h2>
          {exchange}: {ticker}
        </h2>
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
