import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip
} from '@material-ui/core';
import StockContext from '../StockContext.js';
import formatNumber from '../lib';

const CFS = ({ index }) => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [cashFlow, setCashFlow] = useState('');
  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${input}?period=quarter`
    )
      .then(response => response.json())
      .then(data => {
        const info = data.financials.slice(0, 4);
        const cfs = [];
        for (let i = 0; i < info.length; i++) {
          cfs[i] = {};
          cfs[i].opCF = info[i]['Operating Cash Flow'];
          cfs[i].invCF = info[i]['Investing Cash flow'];
          cfs[i].finCF = info[i]['Financing Cash Flow'];
          cfs[i].netCF = info[i]['Net cash flow / Change in cash'];
          cfs[i].freeCF = info[i]['Free Cash Flow'];
        }
        if (mounted.current) {
          setCashFlow(cfs);
        }
      })
      .catch(error => console.error(`Error with CFS component: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (cashFlow) {
    const { opCF, invCF, finCF, netCF, freeCF } = cashFlow[index];
    return (
      <Table>
        <TableHead>
          <TableRow hover>
            <Tooltip
              placement="right"
              title="A financial statement that provides data regarding all cashflow a company receives from its ongoing operations and external investment sources."
            >
              <TableCell>CASH FLOW STATEMENT</TableCell>
            </Tooltip>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Operating Cash Flow:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(opCF))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Investing Cash flow:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(invCF))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Financing Cash Flow:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(finCF))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Net cash flow / Change in cash:</TableCell>
            <TableCell align="right">{formatNumber(parseInt(netCF))}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Free Cash Flow:</TableCell>
            <TableCell align="right">
              {formatNumber(parseInt(freeCF))}
            </TableCell>
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

export default CFS;
