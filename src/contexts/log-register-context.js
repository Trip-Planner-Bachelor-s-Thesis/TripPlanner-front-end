import React, { useState } from 'react';

const LogRegisterContext = React.createContext({
  token: '',
  firstLogin: true,
  login: (token) => {},
  logout: () => {},
  updateFirstLogin: () => {}
});

export const Context = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firstLogin, setFirstLogin] = useState(false);
  console.log(localStorage.getItem("token"));

  const loginHandler = (token, isFirstLogin) => {
    localStorage.setItem("token", token);
    setFirstLogin(isFirstLogin);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const updateFirstLoginHandler = () => {
    setFirstLogin(false);
  };

  const logRegisterContext = {
    token: token,
    firstLogin: firstLogin,
    login: loginHandler,
    logout: logoutHandler,
    updateFirstLogin: updateFirstLoginHandler
  };

  return (
    <LogRegisterContext.Provider value={logRegisterContext}>
      {props.children}
    </LogRegisterContext.Provider>
  );
};

export default LogRegisterContext;