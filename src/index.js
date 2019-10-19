import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import ErrorMessage from './Stock/ErrorMessage';

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
          .catch(error => {
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

          <Switch>
            <Route
              path="/"
              exact
              render={() => <Home company={company} getCompany={getCompany} />}
            />
            <Route
              path="/explore"
              render={() => (
                <Explore company={company} getCompany={getCompany} />
              )}
            />
            <Route
              path="/stock"
              render={() => <Stock getCompany={getCompany} />}
            />

            <Route
              path="/portfolio"
              render={() => (
                <Portfolio company={company} getCompany={getCompany} />
              )}
            />
            <Route path="/user" component={User} />
            <Route path="/terms" component={Disclaimer} />
            <Route component={ErrorMessage} />
          </Switch>

          <Footer getCompany={getCompany} />
        </StockProvider>
      </LoginProvider>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
