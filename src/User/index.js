import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Container, Box } from '@material-ui/core';
import Login from './Login.js';

const User = ({ passUserID }) => {
  return (
    <Box>
      <Login passUserID={passUserID} />
    </Box>
  );
};

export default User;
