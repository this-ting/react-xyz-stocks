import React from 'react';
import { Container, AppBar } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';

export default function Footer() {
  return (
    <AppBar position="static" className="footer">
      <Container>
        <CopyrightIcon />
        <span>XYZ Stocks</span>
      </Container>
    </AppBar>
  );
}
