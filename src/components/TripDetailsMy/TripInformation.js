import styles from "./TripInformation.module.css";
import { options } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const TripInformation = (props) => {
  const navigate = useNavigate();
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

  const chatHandler = () => {
    navigate("chat");
  };

  return (
    <div className={styles["new-trip-control"]}>
      <form>
        <div className={styles["form-container"]}>
          <div className={styles["label-box"]}>
            <label htmlFor="tripDate">Trip date</label>
            <input
              type="text"
              id="tripDate"
              value={`${day}\\${month}\\${year}`}
              disabled
            />
          </div>
          <div className={styles["label-box"]}>
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              value={options[props.tripData.type]}
              disabled
            />
          </div>
          <div className={styles["label-box"]}>
            <label htmlFor="preferences">Preferences</label>
            <input
              type="text"
              id="preferences"
              value={options[props.tripData.preferences]}
              disabled
            />
          </div>
          <button type="submit" onClick={chatHandler}>
            Chat
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripInformation;
