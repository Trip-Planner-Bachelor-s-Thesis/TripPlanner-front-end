import { useContext } from "react";
import { NavLink } from "react-router-dom";

import LogRegisterContext from "../../contexts/log-register-context";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const logRegisterContext = useContext(LogRegisterContext);

  const logoutHandler = () => {
    logRegisterContext.logout();
  };

  return (
    <header className={styles["form-navigation"]}>
      <NavLink to="/">
        <div className={styles["app-title"]}>Trip Planner</div>
      </NavLink>
      <nav>
        <div className={styles["link-container"]}>
          {!logRegisterContext.token && <NavLink to="/auth">Login</NavLink>}
          {logRegisterContext.token && (
            <NavLink to="/trips" className={(navData) => (navData.isActive ? styles.active : "")}>
              All trips
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/my-trips" className={(navData) => (navData.isActive ? styles.active : "")}>
              My trips
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/new-trip" className={(navData) => (navData.isActive ? styles.active : "")}>
              Create trip
            </NavLink>
          )}
          {logRegisterContext.token && (
            <NavLink to="/profile" className={(navData) => (navData.isActive ? styles.active : "")}>
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
