import React, { useState, useEffect } from 'react';
import { Container, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

// import component
import Dropdown from './Search-dropdown.js';

const Search = props => {
  const entries = [];
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input) {
      const searchDB = db.collection('search');
      searchDB
        .where('input', 'array-contains', input)
        .limit(5)
        .get()
        .then(query => {
          query.forEach(doc => {
            const data = doc.data();
            const entry = {
              company: data.company,
              ticker: data.ticker.toUpperCase(),
              exchange: data.exchange.toUpperCase()
            };
            entries.push(entry);
          });
          // console.log(entries);
        })
        .catch(error =>
          console.error(`There is an search FireStore error: ${error}`)
        );
    }
  }, [input]);

  // pass input to ./Markets/index.js
  const handleSubmit = e => {
    const { getCompany } = props;
    e.preventDefault();
    getCompany(input);
    setInput('');
  };

  const renderDropdown = () => {
    if (input) {
      return <Dropdown entries={entries} />;
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
