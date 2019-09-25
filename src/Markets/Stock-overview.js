import React from 'react';

// Import Components
import GraphContainer from './Stock-overview-graphContainer.js';
import Company from './Stock-overview-company.js';
import KeyFin from './Stock-overview-keyfin.js';

const Overview = () => {
  return (
    <>
      <GraphContainer />
      <br />
      <Company />
      <br />
      <KeyFin />
    </>
  );
};

export default Overview;
