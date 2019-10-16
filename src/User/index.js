import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import Login from './User-login.js';
import LoginContext from '../LoginContext.js';
import Portfolio from '../Portfolio';

const User = () => {
  const uid = useContext(LoginContext);

  if (uid) {
    return <Portfolio />;
  }
  return (
    <Box>
      <Login />
    </Box>
  );
};

export default User;
