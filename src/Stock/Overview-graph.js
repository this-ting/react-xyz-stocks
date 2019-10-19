import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';

// import components
import StockContext from '../StockContext.js';

const useStyles = makeStyles({
  root: {
    position: 'relative'
  }
});

const Graph = ({ time }) => {
  const classes = useStyles();
  // context
  const input = useContext(StockContext);

  // check for component mounted
  const mounted = useRef(false);

  const [graphInfo, setGraphInfo] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/chart/${time}?chartCloseOnly=true&filter=date,close,volume&token=Tpk_7190efa09280470180ab8bb6635da780`
      // `https://cloud.iexapis.com/stable/stock/${input}/chart/${time}?chartCloseOnly=true&filter=date,close,volume&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
    )
      .then(response => response.json())
      .then(data => {
        // re-formatting array format [[date,close, volume], [...], [...]]
        let newData = [];
        data.map(data => {
          let temp = [];
          temp[0] = new Date(data.date);
          temp[1] = data.close;
          // temp[2] = data.volume;
          newData.push(temp);
        });
        setGraphInfo(newData);
      })
      .catch(error => console.error(`Error with Graph: ${error}`));

    return () => {
      mounted.current = false;
    };
  }, [input, time]);

  function drawChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Close');
    // data.addColumn({ type: 'number', role: 'tooltip' });
    data.addRows(graphInfo);

    // Set chart options
    const options = {
      chart: {
        subtitle: 'in USD'
      },
      legend: {
        position: 'none'
      },
      backgroundColor: '#fafafa',
      width: '90%',
      height: 350,
      animation: {
        startup: true,
        easing: 'out',
        duration: 5000
      },
      vAxis: { format: 'currency' },
      hAxis: { format: 'M/d/yy' }
    };

    const chart = new google.charts.Line(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  if (graphInfo) {
    google.charts.load('current', { packages: ['line'], callback: drawChart });
    return (
      <>
        <div id="chart_div" className={classes.root} />
      </>
    );
  }

  return (
    <>
      <Skeleton variant="rect" height="30vh" />
    </>
  );
};

export default Graph;
