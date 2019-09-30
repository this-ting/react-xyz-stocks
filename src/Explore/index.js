import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import ExploreSectors from './Explore-exploreSectors';
import SectorList from './Explore-sectorList';
import Search from '../Search';

const useStyles = makeStyles({
  root: {
    marginTop: '11rem',
    maxWidth: '980px',
    marginBottom: '3em'
  }
});

const Explore = ({ getCompany, company }) => {
  const classes = useStyles();

  const [sector, setSector] = useState('');
  const getSector = input => {
    setSector(input);
  };

  const renderExplore = !sector ? (
    <ExploreSectors getSector={getSector} />
  ) : (
    <SectorList sector={sector} getCompany={getCompany} />
  );

  if (company !== '') {
    return <Redirect to="/stock/" />;
  }

  return (
    <Container className={classes.root}>
      <Search getCompany={getCompany} />
      {renderExplore}
    </Container>
  );
};

export default Explore;
