import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@material-ui/core';

export default function Header() {
  return (
    <>
      <AppBar position="static" className="header">
        <Tabs variant="fullWidth" value={0}>
          <Tab label="Home" value="0" to="/" component={NavLink} />
          <Tab label="Markets" value="1" to="/markets/" component={NavLink} />
          <Tab label="User" value="2" to="/user/" component={NavLink} />
        </Tabs>
      </AppBar>
    </>
  );
}
