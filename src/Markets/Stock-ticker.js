import React, { useState, useEffect, useContext } from 'react';
import StockContext from './StockContext.js';

const Ticker = () => {
  const initialState = {
    name: '',
    exchange: '',
    ticker: ''
  };

  // context
  const input = useContext(StockContext);

  const [company, setCompany] = useState(initialState);

  useEffect(() => {
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${input}`)
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.name = data.profile.companyName;
        info.exchange = data.profile.exchange;
        info.ticker = data.symbol;
        setCompany(info);
      })
      .catch(error => alert(error));
  }, [input]);

  return (
    <>
      <h1>{company.name}</h1>
      <h2>
        {company.exchange}: {company.ticker}
      </h2>
    </>
  );
};

export default Ticker;
