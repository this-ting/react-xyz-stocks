import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  return (
    <TextField
      id="search"
      label="Look up by company or ticker"
      margin="normal"
      fullWidth="true"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
}
