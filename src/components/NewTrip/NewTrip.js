import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./NewTrip.module.css";
import DropdownList from "./DropdownList";
// import Map from "./Map";
import Map from "../Map/Map";

const NewTrip = () => {
  const navigate = useNavigate();

  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredWaypoints, setEnteredWaypoints] = useState([]);

  let enableCreateButtonFlag = !!(enteredType && enteredPreferences && enteredDate && enteredWaypoints.length);

  const typeHandler = (value) => {
    setEnteredType(value);
  };

  const preferencesHandler = (value) => {
    setEnteredPreferences(value);
  };

  const dateHandler = (value) => {
    let tripDate = new Date(value).toJSON();
    setEnteredDate(tripDate);
  };

  const waypointsHandler = useCallback((value) => {
    setEnteredWaypoints(value);
  }, []);

  const submitFormHandler = async () => {
    let tripData = {
      type: enteredType,
      preferences: enteredPreferences,
      date: enteredDate,
      waypoints: enteredWaypoints,
    };
    console.log(tripData);
    const response = await fetch("https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json", {
      method: "POST",
      body: JSON.stringify(tripData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Could not create trip.");
    } else {
      navigate("/my-trips", { replace: true });
    }
  };

  return (
    <section className={styles["new-trip-section"]}>
      <div className={styles["new-trip"]}>
        <DropdownList
          onTypeHandler={typeHandler}
          onPreferencesHandler={preferencesHandler}
          onDateHandler={dateHandler}
          onSubmitFormHandler={submitFormHandler}
          enableCreateButtonFlag={enableCreateButtonFlag}
          enteredType={enteredType}
        />
        <Map onWaypointsHandler={waypointsHandler} userWaypointsInput={[]} />
        {/* <Map onWaypointsHandler={waypointsHandler} /> */}
      </div>
    </section>
  );
};

export default NewTrip;
