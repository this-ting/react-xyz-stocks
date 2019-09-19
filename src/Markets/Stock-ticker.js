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
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange&token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.name = data.companyName;
        info.exchange = data.exchange;
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
