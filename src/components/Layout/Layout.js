import { Fragment } from 'react';

import classes from "./Layout.module.css"
import NavigationBar from './NavigationBar';

const Layout = (props) => {
  return (
    <Fragment>
      <NavigationBar />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
