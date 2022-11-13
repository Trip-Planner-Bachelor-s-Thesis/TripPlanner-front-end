import { Fragment } from "react";

import classes from "./TripDetails.module.css";

const TripDetails = (props) => {
  const options = {
    car: "Car trip",
    bike: "Bike ride",
    entertainment: "Entertainment",
    sightseeing: "Sightseeing",
    freeride: "Free ride",
    training: "Training",
  };

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

export default TripDetails;
