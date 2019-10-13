import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

  const renderExplore = sector ? (
    <SectorList sector={sector} getCompany={getCompany} />
  ) : (
    <ExploreSectors getSector={getSector} />
  );

  if (company !== '') {
    return (
      <Redirect
        push
        to={{
          pathname: '/stock',
          search: `?utm=${company}`
        }}
      />
    );
  }

  return (
    <Container className={classes.root}>
      <Search getCompany={getCompany} />
      {renderExplore}
    </Container>
  );
};

export default Explore;
