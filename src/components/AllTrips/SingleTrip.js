import { Link } from "react-router-dom";

import styles from "./SingleTrip.module.css";
import DateBox from "../Utils/DateBox";
import TripDescription from "../Utils/TripDescriptionList";

const SingleTrip = (props) => {
  return (
    <li className={styles["single-trip"]}>
      <DateBox date={props.tripData.date}></DateBox>
      <TripDescription
        type={props.tripData.type}
        preferences={props.tripData.preferences}
        start={props.tripData.waypoints[0].name}
        end={props.tripData.waypoints[props.tripData.waypoints.length - 1].name}
      ></TripDescription>
      <Link className={styles["link-button"]} to={`${props.tripData.tripId}`}>
        Show details
      </Link>
    </li>
  );
};

export default SingleTrip;
