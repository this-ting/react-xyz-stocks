import React, { useState, useEffect } from 'react';
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
  },
  table: {
    minWidth: 650
  }
}));

const ExploreList = props => {
  const { sector } = props;
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
              changePercent: []
            };

            chart.map(char => {
              price.date.push(char.date);
              price.close.push(char.close);
              price.changePercent.push(char.changePercent);
            });

            info.push(price);
          }
          setPrevious(info);
        })
        .catch(error => console.log(error));
    }
  }, [sector]);

  // const companyList = () => {
  //   if (previous) {
  //     previous.map(prev => (
  //       <TableRow key={prev.name}>
  //         <TableCell component="th" scope="row">
  //           {prev.name}
  //         </TableCell>
  //         <TableCell align="right">{prev.close}</TableCell>
  //         <TableCell align="right">{prev.percent}</TableCell>
  //       </TableRow>
  //     ));
  //   }
  // };

  // const companyChart = () => {
  //   if (previous) {
  //     return (
  //       <Paper className={classes.root}>
  //         <Table className={classes.table}>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Company</TableCell>
  //               <TableCell align="right">Price</TableCell>
  //               <TableCell align="right">% Change</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>{companyList}</TableBody>
  //         </Table>
  //       </Paper>
  //     );
  //   }
  // };

  return (
    <>
      <h3>LIST OF COMPANIES IN {sector.toUpperCase()}</h3>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">% Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default ExploreList;
