import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@material-ui/core';

function Header() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <AppBar position="static" className="header">
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab label="Home" to="/" component={NavLink} />
        <Tab label="Markets" to="/markets/" component={NavLink} />
        <Tab label="User" to="/user/" component={NavLink} />
      </Tabs>
    </AppBar>
  );
}

export default Header;
