import React from 'react';
import PrevDayPrice from './Stock-PrevDayPrice.js';
import Company from './Stock-company.js';
import News from './Stock-news.js';
import Similar from './Stock-similar.js';

export default function Stock() {
  return (
    <div>
      <h1>Stock PAGE</h1>
      <h2>Chart</h2>
      <h2>Latest Quote</h2>
      <PrevDayPrice />
      <Company />
      <News />
      <Similar />
    </div>
  );
}
