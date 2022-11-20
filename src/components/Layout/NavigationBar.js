import { useContext } from "react";
import { NavLink } from "react-router-dom";

import LogRegisterContext from "../../contexts/log-register-context";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  const logRegisterContext = useContext(LogRegisterContext);

  const logoutHandler = () => {
    logRegisterContext.logout();
  };

  return (
    <header className={classes["form-navigation"]}>
      <NavLink to="/">
        <div className={classes["app-title"]}>Trip Planner</div>
      </NavLink>
      <nav>
        <div className={classes["link-container"]}>
          {!logRegisterContext.token && <NavLink to="/auth">Login</NavLink>}
          {logRegisterContext.token && (
            <NavLink to="/trips" className={(navData) => (navData.isActive ? classes.active : "")}>
              All trips
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/my-trips" className={(navData) => (navData.isActive ? classes.active : "")}>
              My trips
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/new-trip" className={(navData) => (navData.isActive ? classes.active : "")}>
              Create trip
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/profile" className={(navData) => (navData.isActive ? classes.active : "")}>
              Profile
            </NavLink>
          )}
          {logRegisterContext.token && <button onClick={logoutHandler}>Logout</button>}
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
