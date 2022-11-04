import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Trip Planner</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/trips' className={navData => navData.isActive ? classes.active : '' }>All trips</NavLink >
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/new-trip' className={navData => navData.isActive ? classes.active : '' }>Create trip</NavLink >
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/profile' className={navData => navData.isActive ? classes.active : '' }>Profile</NavLink >
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
