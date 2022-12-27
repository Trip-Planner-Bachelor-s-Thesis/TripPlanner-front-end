import { useState } from "react";

import NavigationBarBootstrap from "./components/Layout/NavigationBarBootstrap";
import MainContent from "./components/Layout/MainContent";
import LogRegisterContext from "./contexts/log-register-context";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [firstLogin, setFirstLogin] = useState(false);
  const [joinedTrip, setJoinedTrip] = useState(false);

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

  const updateJoinedTripHandler = (flag) => {
    setJoinedTrip(flag);
  };

  const initialContext = {
    token: token,
    firstLogin: firstLogin,
    joinedTrip: joinedTrip,
    login: loginHandler,
    logout: logoutHandler,
    updateFirstLogin: updateFirstLoginHandler,
    updateJoinedTrip: updateJoinedTripHandler
  };

  return (
    <LogRegisterContext.Provider value={initialContext}>
      <NavigationBarBootstrap />
      <MainContent />
    </LogRegisterContext.Provider>
  );
}

export default App;
