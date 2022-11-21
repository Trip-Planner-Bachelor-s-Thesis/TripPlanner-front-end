import React, { useState } from 'react';

const LogRegisterContext = React.createContext({
  token: '',
  login: (token) => {},
  logout: () => {},
});

export const Context = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log(localStorage.getItem("token"));

  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const logRegisterContext = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LogRegisterContext.Provider value={logRegisterContext}>
      {props.children}
    </LogRegisterContext.Provider>
  );
};

export default LogRegisterContext;