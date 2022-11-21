import { Fragment } from "react";

import styles from "./TripDescription.module.css";
import { options } from "../../helpers/helpers";

const TripDescription = (props) => {
  return (
    <Fragment>
      <div className={styles["trip-description"]}>
        <div className={styles.type}>{options[props.type]}</div>
        <div className={styles.preferences}>{options[props.preferences]}</div>
      </div>
      <div className={styles.destinations}>
        <div>{props.start.split(",")[0]}</div>
        <div className={styles.arrow}>{String.fromCodePoint(0x2192)}</div>
        <div>{props.end.split(",")[0]}</div>
      </div>
    </Fragment>
  );
};

export default TripDescription;
