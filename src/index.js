import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header/Header.js';

class App extends Component {
  state = {
    name: 'ting'
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Header />
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
