import React, { useState, useEffect } from 'react';
import { Container, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

// import component
import Dropdown from './Search-dropdown.js';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    padding: '0'
  }
});

const Search = ({ getCompany }) => {
  const classes = useStyles();

  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  // pass input to ./index.js
  const handleSearchSubmit = e => {
    e.preventDefault();
    getCompany(input.toUpperCase());
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
      <form onSubmit={handleSearchSubmit}>
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
