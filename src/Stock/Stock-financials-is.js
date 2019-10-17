import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Tooltip
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import StockContext from '../StockContext.js';
import formatNumber from '../lib';

const IS = ({ index }) => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [income, setIncome] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/income-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const is = [];
        for (let i = 0; i < info.length; i++) {
          is[i] = {};
          is[i].rev = info[i]['Revenue'];
          is[i].costOfRev = info[i]['Cost of Revenue'];
          is[i].gp = info[i]['Gross Profit'];
          is[i].gm = info[i]['Gross Margin'];
          is[i].opEx = info[i]['Operating Expenses'];
          is[i].opIncome = info[i]['Operating Income'];
          is[i].ni = info[i]['Net Income'];
          is[i].npm = info[i]['Net Profit Margin'];
        }
        // check if mounted
        if (mounted.current) {
          setIncome(is);
        }
      })
      .catch(error => console.error(`Error with IS component: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (income) {
    const { rev, costOfRev, gp, gm, opEx, opIncome, ni, npm } = income[index];
    return (
      <Table>
        <TableHead>
          <TableRow hover>
            <TableCell>
              INCOME STATEMENT
              <Tooltip
                placement="right"
                title="Reports a company's financial performance over a specific accounting period"
              >
                <InfoIcon />
              </Tooltip>
            </TableCell>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Revenue:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(rev))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Cost of Revenue:</TableCell>
            <TableCell align="right">
              {formatNumber(parseInt(costOfRev))}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Gross Profit:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(gp))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Gross Margin:</TableCell>
            <TableCell align="right">{gm * 100} %</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Operating Expenses:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(opEx))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Operating Income:</TableCell>
            <TableCell align="right">
              {formatNumber(parseInt(opIncome))}
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Net Income:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(ni))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Net Profit Margin:</TableCell>
            <TableCell align="right">{npm * 100} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default IS;
