import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import StockContext from '../StockContext.js';

const useStyles = makeStyles({
  cell: {
    width: '50%'
  }
});

const Company = () => {
  const classes = useStyles();
  // context
  const input = useContext(StockContext);

  // check for component mount
  const mounted = useRef(false);

  const [profile, setProfile] = useState('');

  useEffect(() => {
    mounted.current = true;
    fetch(
      `https://sandbox.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange,sector,industry,website,description,CEO,employees&token=Tpk_7190efa09280470180ab8bb6635da780`
      // `https://cloud.iexapis.com/stable/stock/${input}/company?filter=symbol,companyName,exchange,sector,industry,website,description,CEO,employees&token=pk_0c6bc8f3cc794020a71b34f4fda09669`
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

  if (profile) {
    const {
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
      <>
        <Typography variant="h6" gutterBottom>
          Company Profile
        </Typography>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.cell}>Company:</TableCell>
                <TableCell>{companyName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>Exchange:</TableCell>
                <TableCell>{exchange}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>CEO:</TableCell>
                <TableCell>{ceo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>Employees:</TableCell>
                <TableCell>{employees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>Sector:</TableCell>
                <TableCell>{sector}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>Industry:</TableCell>
                <TableCell>{industry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}>Website:</TableCell>
                <TableCell>{website}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>{description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
  return (
    <>
      <Skeleton variant="rect" height="50vh" />
    </>
  );
};

export default Company;
