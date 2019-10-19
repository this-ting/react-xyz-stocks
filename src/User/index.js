import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Box } from '@material-ui/core';

// import components
import Login from './Login';
import LoginContext from '../LoginContext.js';

const User = () => {
  const uid = useContext(LoginContext);

  useEffect(() => {
    gtag('config', 'G-08LSHJHZVV', {
      page_title: 'User',
      page_path: '/user'
    });
  }, []);

  if (uid) {
    return <Redirect push to="/portfolio" />;
  }
  return (
    <Box>
      <Login />
    </Box>
  );
};

export default User;
