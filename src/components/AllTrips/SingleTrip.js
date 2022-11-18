import { Link } from "react-router-dom";

import classes from "./SingleTrip.module.css";
import DateBox from "./DateBox";
import TripDescription from "./TripDescription";

const SingleTrip = (props) => {
  return (
    <li className={classes["single-trip"]}>
      <DateBox date={props.date}></DateBox>
      <TripDescription
        type={props.type}
        preferences={props.preferences}
        start={props.start}
        end={props.end}
      ></TripDescription>
      <Link className={classes["link-button"]} to={`${props.id}`}>
        Show details
      </Link>
    </li>
  );
};

export default SingleTrip;
