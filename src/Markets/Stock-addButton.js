import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import Components
import LoginContext from '../LoginContext.js';

const AddButton = () => {
  const uid = useContext(LoginContext);

  const [watching, setWatching] = useState('');
  useEffect(() => {
    console.log('Add');
  }, []);

  if (uid) {
    return (
      <>
        <Button variant="contained" color="secondary">
          Add to watchlist
        </Button>
      </>
    );
  }
  return (
    <>
      <Button variant="contained" color="secondary">
        (LOGIN FIRST TO)Add to watchlist
      </Button>
    </>
  );
};

export default AddButton;
