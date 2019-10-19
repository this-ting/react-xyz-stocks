import React from 'react';

// import components
import GraphContainer from './Overview-graphContainer';
import Company from './Overview-company';
import KeyFin from './Overview-keyfin';

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
