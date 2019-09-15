import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, Typography } from '@material-ui/core';
import Categories from './Explore-categories';
import ExploreList from './Explore-explorelist';

const Explore = () => {
  const [sector, setSector] = useState('');

  const getSector = input => {
    setSector(input);
  };

  useEffect(() => {
    console.log(sector);
  }, [sector]);

  return (
    <Container>
      <h3>EXPLORE</h3>
      <ExploreList />
      <Categories getSector={getSector} />
    </Container>
  );
};

export default Explore;
