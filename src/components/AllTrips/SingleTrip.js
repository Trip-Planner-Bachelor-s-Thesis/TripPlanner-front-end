import { Link } from "react-router-dom";

import classes from "./SingleTrip.module.css";
import DateBox from "./DateBox";
import TripDetails from "./TripDetails";

const SingleTrip = (props) => {
  return (
    <li className={classes["single-trip"]}>
      <DateBox date={props.date}></DateBox>
      <TripDetails
        type={props.type}
        preferences={props.preferences}
        start={props.start}
        end={props.end}
      ></TripDetails>
      <Link className={classes["link-button"]} to={`/${props.id}`}>
        Show details
      </Link>
    </li>
  );
};

export default SingleTrip;
