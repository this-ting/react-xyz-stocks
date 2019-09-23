import React, { useState, useEffect } from 'react';
import { Container, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// import component
import Dropdown from './Search-dropdown.js';

const Search = props => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  // pass input to ./Markets/index.js
  const handleSubmit = e => {
    const { getCompany } = props;
    e.preventDefault();
    getCompany(input);
    setInput('');
  };

  const renderDropdown = () => {
    if (input) {
      return <Dropdown input={input} />;
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          id="search"
          label="Look up by company or ticker"
          margin="normal"
          fullWidth="true"
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
