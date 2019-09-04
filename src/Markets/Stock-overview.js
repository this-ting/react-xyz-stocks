import React from 'react';

// Import Components
import GraphStats from './Stock-overview-graph-stats.js';
import PrevDayPrice from './Stock-overview-PrevDayPrice.js';
import Company from './Stock-overview-company.js';
import News from './Stock-overview-news.js';
import KeyFin from './Stock-overview-keyfin.js';
import Similar from './Stock-overview-similar.js';

export default function Overview() {
  return (
    <div>
      <h2>Chart</h2>
      <GraphStats />
      <PrevDayPrice />
      <Company />
      <News />
      <KeyFin />
      <Similar />
    </div>
  );
}
