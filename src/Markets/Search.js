import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as firebase from 'firebase/app';
import { db } from '../Firebase.js';

const Search = props => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    console.log(input);
    const searchDB = db.collection('search');
    searchDB
      .where('input', 'array-contains', input)
      .limit(5)
      .get()
      .then(query => {
        query.forEach(doc => {
          // console.log(`${doc.id} => `);
          // console.log(doc.data());
          const data = doc.data();
          console.log(data.ticker, data.company, data.exchange);
        });
      })
      .catch(error =>
        console.error(`There is an search FireStore error: ${error}`)
      );
  }, [input]);

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
