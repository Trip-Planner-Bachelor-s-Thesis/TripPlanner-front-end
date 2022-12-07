import { Link } from "react-router-dom";

import styles from "./SingleTrip.module.css";
import DateBox from "../Utils/DateBox";
import TripDescription from "../Utils/TripDescriptionList";

const SingleTrip = (props) => {
  return (
    <li className={styles["single-trip"]}>
      <DateBox date={props.date}></DateBox>
      <TripDescription
        type={props.type}
        preferences={props.preferences}
        start={props.start}
        end={props.end}
      ></TripDescription>
      <Link className={styles["link-button"]} to={`${props.id}`}>
        Show details
      </Link>
    </li>
  );
};

export default SingleTrip;
