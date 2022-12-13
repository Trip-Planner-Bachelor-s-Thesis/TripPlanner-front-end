import { Fragment } from "react";

import styles from "./TripDescriptionList.module.css";
import { options } from "../../helpers/helpers";

const TripDescriptionList = (props) => {
  return (
    <Fragment>
      <div className={styles["trip-description"]}>
        <div className={styles.type} data-testid="type">{options[props.type]}</div>
        <div className={styles.preferences} data-testid="preferences">{options[props.preferences]}</div>
      </div>
      <div className={styles.destinations}>
        <div data-testid="start">{props.start.split(",")[0]}</div>
        <div className={styles.arrow}>{String.fromCodePoint(0x2192)}</div>
        <div data-testid="end">{props.end.split(",")[0]}</div>
      </div>
    </Fragment>
  );
};

export default TripDescriptionList;
