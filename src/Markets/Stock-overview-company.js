import React, { useContext, useState, useEffect, useRef } from 'react';
import { Paper, Grid } from '@material-ui/core';
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
      <Paper>
        <h2>Company Info</h2>
        <Grid container direction="column">
          <Grid item>
            Company:
            {companyName}
          </Grid>
          <Grid item>CEO: {ceo}</Grid>
          <Grid item>Employees: {employees}</Grid>
          <Grid item>
            Sector:
            {sector}
          </Grid>
          <Grid item>
            Industry:
            {industry}
          </Grid>
          <Grid item>{description}</Grid>
          <Grid item>Exchange: {exchange}</Grid>
          <Grid item>Ticker: {symbol}</Grid>
          <Grid item>
            Website:
            {website}
          </Grid>
        </Grid>
      </Paper>
    );
  }
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};

export default Company;
