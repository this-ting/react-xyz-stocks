import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const AddButton = () => {
  const [watching, setWatching] = useState('');
  useEffect(() => {
    console.log('Add');
  }, []);

  return (
    <>
      <Button variant="contained" color="secondary">
        Add to watchlist
      </Button>
    </>
  );
};

export default AddButton;
