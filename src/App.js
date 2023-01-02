import { useState } from "react";

import NavigationBarBootstrap from "./components/Layout/NavigationBarBootstrap";
import MainContent from "./components/Layout/MainContent";
import LogRegisterContext from "./contexts/log-register-context";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firstLogin, setFirstLogin] = useState(false);
  const [joinedTrip, setJoinedTrip] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin"));

  const loginHandler = (token, isFirstLogin, isAdmin) => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.setItem("token", token);
    localStorage.setItem("admin", isAdmin);
    setFirstLogin(isFirstLogin);
    setToken(token);
    setIsAdmin(isAdmin);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setIsAdmin(null);
  };

  const updateFirstLoginHandler = () => {
    setFirstLogin(false);
  };

  const updateJoinedTripHandler = (flag) => {
    setJoinedTrip(flag);
  };

  const adminHandler = (token, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", isAdmin);
    setToken(token);
    setIsAdmin(isAdmin);
  };

  const initialContext = {
    token: token,
    firstLogin: firstLogin,
    joinedTrip: joinedTrip,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    updateFirstLogin: updateFirstLoginHandler,
    updateJoinedTrip: updateJoinedTripHandler,
    setAdmin: adminHandler,
  };

  return (
    <LogRegisterContext.Provider value={initialContext}>
      <NavigationBarBootstrap />
      <MainContent />
    </LogRegisterContext.Provider>
  );
}

export default App;
