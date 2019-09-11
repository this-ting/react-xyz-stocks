import React, { useState, useEffect, useContext, useRef } from 'react';

import StockContext from './StockContext.js';

// FIX BUG => CANNNOT READ DATE AS DATE!!!!!!

const Graph = () => {
  // context
  const input = useContext(StockContext);

  // check for component mounted
  const mounted = useRef(false);

  const [graphInfo, setGraphInfo] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/historical-price-full/${input}?serietype=line`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.historical.slice(-30);
        const lineChart = [];
        info.map(inf => {
          let dot = [];
          let beg = 'new Date(';
          const end = ')';
          const newDate = inf.date.replace('-', ', ').replace('-', ', ');
          beg = beg.concat(newDate).concat(end);
          beg = beg.replace(' 0', ' ').replace(' 0', ' ');

          dot[0] = beg;
          dot[1] = inf.close;
          lineChart.push(dot);
        });
        if (mounted.current) {
          setGraphInfo(lineChart);
        }
      })
      .catch(error => alert(`Error: ${error}`));

    return () => {
      mounted.current = false;
    };
  }, [input]);

  function drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Price');
    data.addRows(graphInfo);

    // Set chart options
    const options = {
      chart: {
        subtitle: 'in USD'
      },
      width: 800,
      height: 300,
      animation: {
        startup: true,
        easing: 'out',
        duration: 5000
      }
    };

    const chart = new google.charts.Line(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  if (graphInfo) {
    google.charts.load('current', { packages: ['line'], callback: drawChart });
  }

  return (
    <>
      <div id="chart_div" />
    </>
  );
};

export default Graph;
