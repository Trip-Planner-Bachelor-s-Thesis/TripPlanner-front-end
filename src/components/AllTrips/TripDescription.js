import { Fragment } from "react";

import classes from "./TripDescription.module.css";
import { options } from "../../helpers/helpers";

const TripDescription = (props) => {
  return (
    <Fragment>
      <div className={classes["trip-description"]}>
        <div className={classes.type}>{options[props.type]}</div>
        <div className={classes.preferences}>{options[props.preferences]}</div>
      </div>
      <div className={classes.destinations}>
        <div>{props.start.split(",")[0]}</div>
        <div className={classes.arrow}>{String.fromCodePoint(0x2192)}</div>
        <div>{props.end.split(",")[0]}</div>
      </div>
    </Fragment>
  );
};

export default TripDescription;
