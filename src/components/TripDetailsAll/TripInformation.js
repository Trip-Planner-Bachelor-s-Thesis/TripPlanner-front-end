import classes from "./TripInformation.module.css";
import { options } from "../../helpers/helpers";

const TripInformation = (props) => {
  const date = new Date(props.tripData.date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return (
    <div className={classes["new-trip__control"]}>
      <form>
        <div className={classes["form-container"]}>
          <input type="text" value={`${day}\\${month}\\${year}`} disabled />
          <input type="text" value={options[props.tripData.type]} disabled />
          <input type="text" value={options[props.tripData.preferences]} disabled />
          <button type="submit">Join</button>
        </div>
      </form>
    </div>
  );
};

export default TripInformation;
