import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Container, Box } from '@material-ui/core';
import Login from './Login.js';

const User = () => {
  const [loginStatus, setLoginStatus] = useState('');

  // pass user login details to user component
  const passLoginStatus = data => {
    setLoginStatus(data);
  };

  return (
    <Box>
      <Login passLoginStatus={passLoginStatus} />
    </Box>
  );
};

export default User;
