import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
// import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  }
}));

const SectorList = ({ sector, handleClick, company }) => {
  const classes = useStyles();

  // state for previous price
  const [previous, setPrevious] = useState('');
  useEffect(() => {
    if (sector) {
      const sectorCollection = db.collection('sectors').doc(sector);
      sectorCollection
        .get()
        .then(doc => doc.data().companies)
        .then(data =>
          fetch(
            `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${data}&types=chart&range=5d&token=Tpk_7190efa09280470180ab8bb6635da780&filter=date,close,changePercent`
          )
        )
        .then(response => response.json())
        .then(data => {
          const info = [];
          const companies = Object.keys(data);
          for (let i = 0; i < companies.length; i++) {
            const { chart } = data[companies[i]];
            const price = {
              ticker: companies[i],
              date: [],
              close: [],
              percent: []
            };

            chart.map(char => {
              price.date.push(char.date);
              price.close.push(char.close);
              price.percent.push(char.changePercent);
            });

            info.push(price);
          }
          setPrevious(info);
        })
        .catch(error => console.log(error));
    }
  }, [sector]);

  if (previous) {
    return (
      <>
        <h3>COMPANIES IN THE {sector.toUpperCase()} SECTOR</h3>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">% Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previous.map(prev => (
                <TableRow
                  hover
                  key={prev.ticker}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <TableCell component="th" scope="row">
                    {prev.ticker}
                  </TableCell>
                  <TableCell align="right">{prev.close[4]}</TableCell>
                  <TableCell align="right">{prev.percent[4]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
  return <h3>Rendering..</h3>;
};

export default withRouter(SectorList);
