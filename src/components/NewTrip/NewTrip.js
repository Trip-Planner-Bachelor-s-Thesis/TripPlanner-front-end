import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./NewTrip.module.css";
import PreferencesDescriptionCreate from "./PreferencesDescriptionCreate";
import DropdownList from "./DropdownList";
import Map from "../Map/Map";

const NewTrip = () => {
  const navigate = useNavigate();

  const [enteredType, setEnteredType] = useState("");
  const [enteredPreferences, setEnteredPreferences] = useState([]);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [enteredWaypoints, setEnteredWaypoints] = useState([]);
  const [calculatedTripData, setCalculatedTripData] = useState(null);

  let enableCreateButtonFlag = !!(
    enteredType &&
    enteredPreferences.length &&
    enteredDescription &&
    enteredDate &&
    enteredTime &&
    enteredWaypoints.length
  );

  const typeHandler = (value) => {
    setEnteredType(value);
  };

  const preferencesHandler = (value) => {
    setEnteredPreferences(value);
  };

  const descriptionHandler = (value) => {
    setEnteredDescription(value);
  };

  const dateHandler = (value) => {
    let tripDate = new Date(value).toJSON();
    setEnteredDate(tripDate);
  };

  const timeHandler = (value) => {
    console.log(value);
    setEnteredTime(value);
  };

  const waypointsHandler = useCallback((value) => {
    setEnteredWaypoints(value);
  }, []);

  const calculatedTripDataHandler = useCallback((value) => {
    console.log(value);
    setCalculatedTripData(value);
  }, []);

  const submitFormHandler = async () => {
    let tripData = {
      type: enteredType,
      preferences: enteredPreferences,
      description: enteredDescription,
      date: enteredDate,
      waypoints: enteredWaypoints,
      distance: calculatedTripData.distance,
      time: calculatedTripData.totalTime
    };
    console.log(tripData);
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
          onDateHandler={dateHandler}
          onTimeHandler={timeHandler}
          onSubmitFormHandler={submitFormHandler}
          enableCreateButtonFlag={enableCreateButtonFlag}
          enteredType={enteredType}
        />
        <div className={styles["map-details-container"]}>
          <PreferencesDescriptionCreate
            onDescriptionHandler={descriptionHandler}
            onPreferencesHandler={preferencesHandler}
            enteredPreferences={enteredPreferences}
            calculatedTripData={calculatedTripData}
          />
          <Map
            onWaypointsHandler={waypointsHandler}
            onCalculatedTripDataHandler={calculatedTripDataHandler}
            typeOfTransport={enteredType}
            userWaypointsInput={enteredWaypoints}
          />
        </div>
      </div>
    </section>
  );
};

export default NewTrip;
