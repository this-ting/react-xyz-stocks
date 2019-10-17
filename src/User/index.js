import React, { useContext, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Login from './User-login.js';
import LoginContext from '../LoginContext.js';
import Portfolio from '../Portfolio';

const User = () => {
  const uid = useContext(LoginContext);

  useEffect(() => {
    gtag('config', 'G-08LSHJHZVV', {
      page_title: 'User',
      page_path: '/user'
    });
  }, []);

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
