import { Fragment } from 'react';

import styles from "./MainContent.module.css"
import NavigationBar from './NavigationBar';

const MainContent = (props) => {
  return (
    <Fragment>
      <NavigationBar />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
};

export default MainContent;
