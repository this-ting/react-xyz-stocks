import React, { useState, useEffect } from 'react';
import { Container, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

// import component
import Dropdown from './Search-dropdown.js';

const useStyles = makeStyles({
  root: {
    position: 'relative'
  }
});

const Search = ({ getCompany }) => {
  const classes = useStyles();

  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  // pass input to ./Markets/index.js
  const handleSubmit = e => {
    e.preventDefault();
    getCompany(input);
    setInput('');
  };

  const renderDropdown = () => {
    if (input) {
      return (
        <Dropdown input={input} setInput={setInput} getCompany={getCompany} />
      );
    }
  };

  return (
    <Container className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="search"
          label="Look up by company or ticker"
          margin="normal"
          value={input}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </form>
      {renderDropdown()}
    </Container>
  );
};

export default Search;
