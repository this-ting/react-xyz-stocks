import React from 'react';

// Import Components
import GraphStats from './Stock-overview-graph-stats.js';
import PrevDayPrice from './Stock-overview-PrevDayPrice.js';
import Company from './Stock-overview-company.js';
import KeyFin from './Stock-overview-keyfin.js';

const Overview = () => {
  return (
    <div>
      <GraphStats />
      <PrevDayPrice />
      <Company />
      <KeyFin />
    </div>
  );
};

export default Overview;
