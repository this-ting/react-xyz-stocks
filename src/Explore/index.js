import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import ExploreSector from './Explore-exploreSector';
import SectorList from './Explore-sectorList';
import Search from '../Search';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px',
    marginBottom: '3em'
  }
});

const Explore = ({ handleClick, getCompany, company }) => {
  const classes = useStyles();

  const [sector, setSector] = useState('');
  const getSector = input => {
    setSector(input);
  };

  const renderExplore = !sector ? (
    <ExploreSector getSector={getSector} />
  ) : (
    <SectorList company={company} sector={sector} handleClick={handleClick} />
  );

  return (
    <Container className={classes.root}>
      <Search getCompany={getCompany} />
      {renderExplore}
    </Container>
  );
};

export default Explore;
