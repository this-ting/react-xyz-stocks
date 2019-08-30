import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';

class App extends Component {
  state = {
    name: 'ting'
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Header />
        <Footer />
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
