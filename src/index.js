import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Home from './Home';
import Markets from './Markets';
import User from './User';
import Footer from './Footer';

class App extends Component {
  state = {
    name: 'ting'
  };

  render() {
    return (
      <Router>
        <CssBaseline />
        <Markets />
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/markets/" component={Markets} />
        <Route path="/user/" component={User} />
        <Footer />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
