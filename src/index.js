import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

// import components
import Header from './Header';
import Home from './Home';
import Markets from './Markets';
import User from './User';
import Disclaimer from './Disclaimer';
import Footer from './Footer';
import Portfolio from './User/portfolio.js';
import { LoginProvider } from './LoginContext';

const App = () => {
  const [userID, setUserID] = useState('');

  const passUserID = data => {
    setUserID(data);
  };

  return (
    <Router>
      <LoginProvider value={userID}>
        <CssBaseline />
        <Header />
        {/* <Portfolio /> */}
        <Markets />
        <Route path="/" exact component={Home} />
        <Route path="/markets/" component={Markets} />
        <Route path="/portfolio/" component={Portfolio} />
        <Route path="/user/" render={() => <User passUserID={passUserID} />} />
        <Route path="/terms/" component={Disclaimer} />
        <Footer />
      </LoginProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
