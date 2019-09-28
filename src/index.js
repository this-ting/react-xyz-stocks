import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as firebase from 'firebase/app';
import { auth, db } from './Firebase.js';

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
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        setUserID(user.uid);
        console.log(user);

        // update user document in db
        db.collection('users')
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
              name: user.providerData[0].displayName,
              email: user.providerData[0].email,
              watchlist: []
            },
            { merge: true }
          )
          .then(() => {
            console.log('Success updating user db');
          })
          .catch(() => {
            console.error(error);
          });
      } else {
        setUserID('');
        console.log('not signed in');
      }
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [userID]);

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
