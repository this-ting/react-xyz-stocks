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
    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${input}`)
      .then(response => response.json())
      .then(data => {
        const info = {};
        info.symbol = data.symbol;
        info.companyName = data.profile.companyName;
        info.exchange = data.profile.exchange;
        info.sector = data.profile.sector;
        info.industry = data.profile.industry;
        info.website = data.profile.website;
        info.description = data.profile.description;
        info.ceo = data.profile.ceo;
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
      ceo
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
