import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { auth } from '../Firebase.js';

// import component
import LoginContext from '../LoginContext';

const LoginButton = () => {
  const uid = useContext(LoginContext);

  const [DialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if (uid) {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDialogOpen}
        >
          Log Out
        </Button>
        <Dialog
          open={DialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      to="/user/"
      component={NavLink}
    >
      Login
    </Button>
  );
};

export default LoginButton;
