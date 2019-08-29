import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './Home/Home.js';
import Markets from './Markets/Markets.js';
import User from './User/User.js';

class App extends Component {
  state = {
    name: 'ting'
  };

  render() {
    return (
      <div>
        <Router>
          <CssBaseline />
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/markets/">Markets</Link>
              </li>
              <li>
                <Link to="/user/">User</Link>
              </li>
            </ul>
          </nav>
          <h1>This is XYZ Stocks. Hello {this.state.name}</h1>
          <Route path="/" exact component={Home} />
          <Route path="/markets/" component={Markets} />
          <Route path="/user/" component={User} />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
