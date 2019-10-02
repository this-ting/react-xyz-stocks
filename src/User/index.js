import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import Login from './User-login.js';
import Settings from './User-settings.js';
import LoginContext from '../LoginContext.js';

const User = () => {
  const uid = useContext(LoginContext);

  if (uid) {
    return <Settings />;
  }
  return (
    <Box>
      <Login />
    </Box>
  );
};

export default User;
