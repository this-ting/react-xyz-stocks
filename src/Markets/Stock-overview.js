import React from 'react';

// Import Components
import GraphStats from './Stock-overview-graph-stats.js';
import PrevDayPrice from './Stock-overview-PrevDayPrice.js';
import Company from './Stock-overview-company.js';
import News from './Stock-overview-news.js';
import KeyFin from './Stock-overview-keyfin.js';

const Overview = () => {
  return (
    <div>
      <h2>Overview</h2>
      <GraphStats />
      <PrevDayPrice />
      <Company />
      <News />
      <KeyFin />
    </div>
  );
};

export default Overview;
