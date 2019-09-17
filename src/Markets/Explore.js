import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Categories from './Explore-categories';
import ExploreList from './Explore-explorelist';

const useStyles = makeStyles({
  container: {
    marginBottom: '3em'
  }
});

const Explore = () => {
  const classes = useStyles();

  const [sector, setSector] = useState('');

  const getSector = input => {
    setSector(input);
  };

  const renderExplore = () => {
    if (!sector) {
      return (
        <>
          <Categories getSector={getSector} />
        </>
      );
    }
    return (
      <>
        <ExploreList sector={sector} />
      </>
    );
  };

  return <Container className={classes.container}>{renderExplore()}</Container>;
};

export default Explore;
