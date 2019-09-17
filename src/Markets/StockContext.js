import React from 'react';

// create new context
const StockContext = React.createContext({});

// wrapper where you want access to the context
export const StockProvider = StockContext.Provider;

export default StockContext;
