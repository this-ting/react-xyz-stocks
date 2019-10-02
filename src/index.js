import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as firebase from 'firebase/app';
import { auth, db } from './Firebase.js';

// import components
import Header from './Header';
import Home from './Home';
import User from './User';
import Disclaimer from './Disclaimer';
import Footer from './Footer';
import Portfolio from './Portfolio';
import { LoginProvider } from './LoginContext';
import { StockProvider } from './StockContext.js';
import Stock from './Stock';
import Explore from './Explore';

const App = () => {
  const [userID, setUserID] = useState('');
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        setUserID(user.uid);

        // update user document in db
        db.collection('users')
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
              name: user.providerData[0].displayName,
              email: user.providerData[0].email
            },
            { merge: true }
          )
          .catch(() => {
            console.error(error);
          });
      } else {
        setUserID('');
      }
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [userID]);

  const [company, setCompany] = useState('');
  const getCompany = input => {
    setCompany(input);
  };

  return (
    <Router>
      <LoginProvider value={userID}>
        <StockProvider value={company}>
          <CssBaseline />
          <Header getCompany={getCompany} />

          {/* <Portfolio /> */}
          {/* <Markets /> */}

          <Route
            path="/"
            exact
            render={() => <Home company={company} getCompany={getCompany} />}
          />
          <Route
            path="/explore/"
            render={() => <Explore company={company} getCompany={getCompany} />}
          />
          <Route
            path="/stock/"
            render={() => <Stock getCompany={getCompany} />}
          />

          <Route
            path="/portfolio/"
            render={() => (
              <Portfolio company={company} getCompany={getCompany} />
            )}
          />
          <Route path="/user/" component={User} />
          <Route path="/terms/" component={Disclaimer} />

          <Footer getCompany={getCompany} />
        </StockProvider>
      </LoginProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
