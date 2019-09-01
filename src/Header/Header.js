import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import Home from '../Home/Home.js';
import Markets from '../Markets/Markets.js';
import User from '../User/User.js';

export default function Header() {
  return (
    <Router>
      <AppBar position="static" className="header">
        <Tabs variant="fullWidth" value={0}>
          <Tab label="Home" value="0" to="/" component={NavLink} />
          <Tab label="Markets" value="1" to="/markets/" component={NavLink} />
          <Tab label="User" value="2" to="/user/" component={NavLink} />
        </Tabs>
      </AppBar>
      <Route path="/" exact component={Home} />
      <Route path="/markets/" component={Markets} />
      <Route path="/user/" component={User} />
    </Router>
  );
}
