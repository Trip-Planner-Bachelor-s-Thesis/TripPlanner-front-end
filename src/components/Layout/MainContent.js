import { Fragment } from 'react';

import styles from "./MainContent.module.css"
import NavigationBarBootstrap from './NavigationBarBootstrap';

const MainContent = (props) => {
  return (
    <Fragment>
      <NavigationBarBootstrap />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
};

export default MainContent;
