import React, { useState } from 'react';

const LogRegisterContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const ContextComponent = (props) => {
  const [token, setToken] = useState(null);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LogRegisterContext.Provider value={contextValue}>
      {props.children}
    </LogRegisterContext.Provider>
  );
};

export default LogRegisterContext;