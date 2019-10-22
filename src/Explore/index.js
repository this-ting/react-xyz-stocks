import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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

const Explore = ({ history, match, getCompany, company }) => {
  const classes = useStyles();

  const [sector, setSector] = useState('');
  useEffect(() => {
    gtag('config', 'G-08LSHJHZVV', {
      page_title: 'Explore',
      page_path: '/Explore'
    });
  }, [sector]);

  const getSector = input => {
    setSector(input);
  };

  // for browser back button
  window.onpopstate = () => {
    if (history.action === 'POP') {
      if (match.path === '/explore') {
        setSector('');
      } else if (match.path !== '/explore') {
        setSector(match.params.sectorName);
      }
    }
  };

  const renderExplore = sector ? (
    <Redirect push to={`${match.path}/${sector}`} />
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
      <Route
        path={`${match.path}/:sectorName`}
        render={props => (
          <SectorList
            {...props}
            sector={sector}
            setSector={setSector}
            getCompany={getCompany}
          />
        )}
      />
    </Container>
  );
};

export default Explore;
