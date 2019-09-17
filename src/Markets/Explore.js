import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import ExploreSector from './Explore-exploreSector';
import SectorList from './Explore-sectorList';

const useStyles = makeStyles({
  container: {
    marginBottom: '3em'
  }
});

const Explore = ({ handleClick }) => {
  const classes = useStyles();

  const [sector, setSector] = useState('');
  const getSector = input => {
    setSector(input);
  };

  const renderExplore = () => {
    if (!sector) {
      return (
        <>
          <ExploreSector getSector={getSector} />
        </>
      );
    }
    return (
      <>
        <SectorList sector={sector} handleClick={handleClick} />
      </>
    );
  };

  return <Container className={classes.container}>{renderExplore()}</Container>;
};

export default Explore;
