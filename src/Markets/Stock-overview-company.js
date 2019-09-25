import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container
} from '@material-ui/core';
import StockContext from './StockContext.js';

const Company = () => {
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const initialState = {
    symbol: '',
    companyName: '',
    exchange: '',
    sector: '',
    industry: '',
    website: '',
    description: '',
    ceo: ''
  };

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange,sector,industry,website,description,CEO,employees&token=Tpk_7190efa09280470180ab8bb6635da780`
    )
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.symbol = data.symbol;
        info.companyName = data.companyName;
        info.exchange = data.exchange;
        info.sector = data.sector;
        info.industry = data.industry;
        info.website = data.website;
        info.description = data.description;
        info.ceo = data.CEO;
        info.employees = data.employees.toLocaleString();
        if (mounted.current) {
          setProfile(info);
        }
      });

    // Cleanup
    return () => {
      mounted.current = false;
    };
  }, [input]);

  if (profile.symbol) {
    const {
      symbol,
      exchange,
      companyName,
      website,
      sector,
      industry,
      description,
      ceo,
      employees
    } = profile;

    return (
      <Container>
        <Typography variant="h6">Company Profile</Typography>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Company:</TableCell>
                <TableCell>{companyName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Exchange:</TableCell>
                <TableCell>{exchange}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CEO:</TableCell>
                <TableCell>{ceo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Employees:</TableCell>
                <TableCell>{employees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sector:</TableCell>
                <TableCell>{sector}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Industry::</TableCell>
                <TableCell>{industry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Website::</TableCell>
                <TableCell>{website}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default Company;
