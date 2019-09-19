import React from 'react';

// Import Components
import PrevDayPrice from './Stock-overview-PrevDayPrice.js';
import Company from './Stock-overview-company.js';
import KeyFin from './Stock-overview-keyfin.js';

const Overview = () => {
  return (
    <div>
      <PrevDayPrice />
      <Company />
      <KeyFin />
    </div>
  );
};

export default Overview;
