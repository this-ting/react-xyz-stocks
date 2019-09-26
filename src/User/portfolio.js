import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import components
import Watchlist from './portfolio-watchlist.js';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px'
  }
});

const Portfolio = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h6" gutterBottom="true">
        Portfolio
      </Typography>
      <Watchlist />
    </Container>
  );
};

export default Portfolio;
