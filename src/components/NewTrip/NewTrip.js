import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./NewTrip.module.css";
import DropdownList from "./DropdownList";
import Map from "./Map";

const NewTripPage = () => {
  const navigate = useNavigate();

  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredWaypoints, setEnteredWaypoints] = useState([]);

  let enableCreateButtonFlag = !!(
    enteredType &&
    enteredPreferences &&
    enteredDate &&
    enteredWaypoints.length
  );

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
    const response = await fetch(
      "https://react-http-4d0e4-default-rtdb.europe-west1.firebasedatabase.app/trips.json",
      {
        method: "POST",
        body: JSON.stringify(tripData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      // throw new Error(data.message || "Could not create quote.");
      alert(data.message || "Could not create quote.");
    } else {
      alert(data.message);
      navigate("/my-trips", { replace: true });
    }

    //return null;
  };

  return (
    <section>
      <div className={classes["new-trip"]}>
        <DropdownList
          onTypeHandler={typeHandler}
          onPreferencesHandler={preferencesHandler}
          onDateHandler={dateHandler}
          onSubmitFormHandler={submitFormHandler}
          enableCreateButtonFlag={enableCreateButtonFlag}
          enteredType={enteredType}
        />
        <Map onWaypointsHandler={waypointsHandler} />
      </div>
    </section>
  );
};

export default NewTripPage;
