import React from 'react';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const Ticker = ({ company }) => {
  if (company) {
    const { name, exchange, ticker } = company;
    return (
      <>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="overline">
          {exchange}: {ticker}
        </Typography>
      </>
    );
  }
  return (
    <>
      <Skeleton variant="rect" width={100} height={30} />
    </>
  );
};

export default Ticker;
