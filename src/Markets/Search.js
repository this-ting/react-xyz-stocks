import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

  return (
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
  );
};
export default Search;
