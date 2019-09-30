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
import Markets from './Markets';
import User from './User';
import Disclaimer from './Disclaimer';
import Footer from './Footer';
import Portfolio from './User/portfolio.js';
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
        console.log(user);

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

  const [company, setCompany] = useState('');
  const getCompany = input => {
    setCompany(input);
  };

  /* 
    State lifted up from SectorList; handleClick is passed down to 
    Explore => SectorList to the onClick
  */
  const handleClick = e => {
    const value = e.currentTarget.firstElementChild.textContent;
    console.log(e.currentTarget);
    // setCompany(value);
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
            render={() => (
              <Explore
                company={company}
                getCompany={getCompany}
                handleClick={handleClick}
              />
            )}
          />
          <Route
            path="/stock/"
            render={() => <Stock getCompany={getCompany} />}
          />

          <Route path="/portfolio/" component={Portfolio} />
          <Route path="/user/" component={User} />
          <Route path="/terms/" component={Disclaimer} />

          <Footer getCompany={getCompany} />
        </StockProvider>
      </LoginProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
