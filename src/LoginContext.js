import React from 'react';

// create new context for user login status
const LoginContext = React.createContext({});

// wrapper where you want to access the content
export const LoginProvider = LoginContext.Provider;

export default LoginContext;
