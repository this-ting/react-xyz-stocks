import React from 'react';

const StockContext = React.createContext({});

export const StockProvider = StockContext.Provider;
export const StockConsumer = StockContext.Consumer;

export default StockContext;
