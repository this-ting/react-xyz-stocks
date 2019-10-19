import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

// import components
import ExploreSectors from './ExploreSectors';
import SectorList from './SectorList';
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
  useEffect(() => {
    gtag('config', 'G-08LSHJHZVV', {
      page_title: 'Explore',
      page_path: '/Explore'
    });
  }, []);
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
