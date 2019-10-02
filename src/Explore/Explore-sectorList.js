import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Hidden
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  plus: {
    color: '#4F9E59',
    alignItems: 'center',
    display: 'flex'
  },
  minus: {
    color: '#D3483A',
    alignItems: 'center',
    display: 'flex'
  },
  row: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const SectorList = ({ sector, getCompany }) => {
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
            `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${data}&types=chart,company&range=5d&token=Tpk_7190efa09280470180ab8bb6635da780&&filter=date,close,changePercent,companyName`
            // `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${data}&types=chart,company&range=5d&token=pk_0c6bc8f3cc794020a71b34f4fda09669&filter=date,close,changePercent,companyName`
          )
        )
        .then(response => response.json())
        .then(data => {
          const info = [];
          const companies = Object.keys(data);
          for (let i = 0; i < companies.length; i++) {
            const { chart, company } = data[companies[i]];
            const price = {
              ticker: companies[i],
              name: company.companyName,
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
        .catch(error => console.error(error));
    }
  }, [sector]);

  const handleCompanyClick = e => {
    const input = e.currentTarget.attributes.ticker.nodeValue;
    getCompany(input);
  };

  const renderPriceColor = (change, symbol) => {
    if (change > 0) {
      return (
        <TableCell align="right" className={classes.plus}>
          {change} {symbol}
          <ArrowUpwardIcon />
        </TableCell>
      );
    }
    if (change < 0) {
      return (
        <TableCell align="right" className={classes.minus}>
          {change} {symbol}
          <ArrowDownwardIcon />
        </TableCell>
      );
    }
  };

  if (previous) {
    const renderRows = previous.map(prev => (
      <TableRow
        hover
        key={prev.ticker}
        {...{ ticker: prev.ticker }}
        onClick={handleCompanyClick}
        className={classes.row}
      >
        <Hidden xsDown>
          <TableCell>{prev.name}</TableCell>
        </Hidden>
        <TableCell component="th" scope="row">
          {prev.ticker}
        </TableCell>
        <TableCell align="right">{prev.close[4]}</TableCell>
        {renderPriceColor(prev.percent[4], '%')}
      </TableRow>
    ));

    return (
      <>
        <h3>COMPANIES IN THE {sector.toUpperCase()} SECTOR</h3>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <Hidden smUp>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Price</TableCell>
                </Hidden>
                <Hidden xsDown>
                  <TableCell>Company</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Price (USD $)</TableCell>
                </Hidden>
                <TableCell align="right">% Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows}</TableBody>
          </Table>
        </Paper>
      </>
    );
  }
  return <h3>Rendering..</h3>;
};

export default SectorList;
