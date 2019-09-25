import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import StockContext from './StockContext.js';

const CFS = props => {
  const { index } = props;
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = [
    {
      opCF: '',
      invCF: '',
      finCF: '',
      netCF: '',
      freeCF: ''
    },
    {
      opCF: '',
      invCF: '',
      finCF: '',
      netCF: '',
      freeCF: ''
    },
    {
      opCF: '',
      invCF: '',
      finCF: '',
      netCF: '',
      freeCF: ''
    },
    {
      opCF: '',
      invCF: '',
      finCF: '',
      netCF: '',
      freeCF: ''
    }
  ];

  const [cashFlow, setCashFlow] = useState(initialState);
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
      .catch(error => alert(`Error with CFS component: ${error}`));

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  // if undefined, means data not rendered yet
  if (cashFlow[index]) {
    const { opCF, invCF, finCF, netCF, freeCF } = cashFlow[index];
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>CASH FLOW STATEMENT</TableCell>
            <TableCell align="right">(USD $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Operating Cash Flow:</TableCell>
            <TableCell align="right">{opCF.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Investing Cash flow:</TableCell>
            <TableCell align="right">{invCF.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Financing Cash Flow:</TableCell>
            <TableCell align="right">{finCF.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Net cash flow / Change in cash:</TableCell>
            <TableCell align="right">{netCF.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Free Cash Flow:</TableCell>
            <TableCell align="right">{freeCF.toLocaleString()}</TableCell>
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
